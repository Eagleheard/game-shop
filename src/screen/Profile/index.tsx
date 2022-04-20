import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchUserInfo, uploadUserPhoto } from 'api/fetchUser';
import { fetchOrders } from 'api/fetchOrders';
import { fetchAchievement } from 'api/fetchAchievements';
import { Card } from 'screen';
import { Achievements, Button, Select } from 'components';
import { IAchievement, IOrder, IUser } from 'types/interfaces';

import userImg from 'assets/userPhoto.png';

import {
  ProfileComponent,
  ProfileContainer,
  ProfileContent,
  ProfileEmail,
  ProfileInfo,
  ProfileLabel,
  ProfileName,
  ProfileNavigation,
  ProfilePhoto,
  ProfileUploadPhoto,
  ProfileUploadPhotoButton,
} from './styled-components';

enum orderOptions {
  NEWEST_ORDERS = 'Newest orders',
  OLDEST_ORDERS = 'Oldest orders',
}

interface IParams {
  order?: string;
}

export const Profile = () => {
  const { id } = useParams<string>();
  const [userInfo, setUserInfo] = useState<IUser>({});
  const [isLoading, setIsLoading] = useState(false);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [params, setParams] = useState<IParams>({ order: 'Newest' });
  const [isAchievementsVisible, setIsAchievementsVisible] = useState(true);
  const [isOrdersVisible, setOrdersVisible] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await fetchUserInfo(id);
      setUserInfo(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const getAchievements = async () => {
    try {
      const { data } = await fetchAchievement();
      setAchievements(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getOrders = useCallback(async (params: IParams) => {
    try {
      const { data } = await fetchOrders({ params });
      setOrders(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleSwitch = () => {
    if (isAchievementsVisible) {
      setIsAchievementsVisible(false);
      setOrdersVisible(true);
      return;
    }
    if (isOrdersVisible) {
      setIsAchievementsVisible(true);
      setOrdersVisible(false);
      return;
    }
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case orderOptions.NEWEST_ORDERS:
        setParams({ order: 'Newest' });
        break;
      case orderOptions.OLDEST_ORDERS:
        setParams({ order: 'Oldest' });
        break;
      default:
        setParams({});
    }
  };

  const uploadPhoto = async (files: FileList | null) => {
    try {
      const formData = new FormData();
      files ? formData.append('file', files[0]) : undefined;
      formData.append('upload_preset', 'fabra5gx');
      const { data } = await uploadUserPhoto(formData, id);
      setUserInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
    getAchievements();
    getOrders(params);
    setIsLoading(false);
  }, [getOrders, params, fetchUser]);

  return (
    <ProfileComponent>
      <ProfileNavigation>
        <Button
          text="Achievement"
          onClick={handleSwitch}
          style="profile"
          disabled={isAchievementsVisible}
        />
        <Button text="Orders" onClick={handleSwitch} style="profile" disabled={isOrdersVisible} />
      </ProfileNavigation>
      {!isLoading && (
        <ProfileContainer>
          <ProfileInfo>
            <ProfilePhoto src={userInfo.photo ? userInfo.photo : userImg} alt="profile photo" />
            <ProfileUploadPhoto htmlFor="file-upload">Upload new photo</ProfileUploadPhoto>
            <ProfileUploadPhotoButton
              id="file-upload"
              type="file"
              onChange={(event: ChangeEvent<HTMLInputElement>) => uploadPhoto(event.target.files)}
            />
            <ProfileName>
              {userInfo.name} {userInfo.lastName}
            </ProfileName>
            <ProfileEmail>Email : {userInfo.email}</ProfileEmail>
          </ProfileInfo>
          <ProfileContent>
            {isAchievementsVisible && (
              <>
                <ProfileLabel>Achievements</ProfileLabel>
                {achievements.map((achievement) => (
                  <Achievements
                    key={achievement.achievementId ?? achievement.id}
                    {...achievement}
                  />
                ))}
              </>
            )}
            {isOrdersVisible && (
              <>
                <ProfileLabel>Orders</ProfileLabel>
                <Select
                  placeholder="Newest orders"
                  options={[
                    { id: 0, label: 'Newest orders', value: 'Newest' },
                    { id: 1, label: 'Oldest orders', value: 'Oldest' },
                  ]}
                  style="profile"
                  handleSelect={handleSelect}
                />
                {orders && !isLoading ? (
                  orders.map(({ id, game, formatedCreatedAt, quantity }) => (
                    <Card
                      order
                      key={id}
                      purchaseDate={formatedCreatedAt}
                      quantity={quantity}
                      {...game}
                    />
                  ))
                ) : (
                  <p>Loading</p>
                )}
              </>
            )}
          </ProfileContent>
        </ProfileContainer>
      )}
    </ProfileComponent>
  );
};
