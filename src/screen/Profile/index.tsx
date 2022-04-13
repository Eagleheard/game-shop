import { fetchUserInfo } from 'api/fetchUser';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'screen';
import { fetchOrders } from 'api/fetchOrders';
import { fetchAchievement } from 'api/fetchAchievements';
import { IAchievement, IOrder, IUser } from 'types/interfaces';
import { Achievements, Button } from 'components';

import userImg from 'assets/userPhoto.png';
import camera from 'assets/camera.png';

import './style.scss';

export const Profile = () => {
  const { id } = useParams<string>();
  const [userInfo, setUserInfo] = useState<IUser>({});
  const [isLoading, setIsLoading] = useState(false);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
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

  const getAchievements = useCallback(async () => {
    try {
      const { data } = await fetchAchievement();
      setAchievements(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getOrders = useCallback(async () => {
    try {
      const { data } = await fetchOrders();
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

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
    getAchievements();
    getOrders();
    setIsLoading(false);
  }, [fetchUser, getAchievements, getOrders]);

  return (
    <div className="profile">
      <div className="profile__navigation">
        <Button
          text="Achievement"
          onClick={handleSwitch}
          style="profile"
          disabled={isAchievementsVisible}
        />
        <Button text="Orders" onClick={handleSwitch} style="profile" disabled={isOrdersVisible} />
      </div>
      {!isLoading && (
        <div className="profile__container">
          <div className="profile__info">
            <img
              src={userInfo.photo ? userInfo.photo : userImg}
              className="profile__photo"
              alt="profile photo"
            />
            <img
              src={camera}
              className="profile__change-photo"
              alt="profile photo"
              onClick={() => alert()}
            />
            <p className="profile__name">
              {userInfo.name} {userInfo.lastName}
            </p>
            <p className="profile__email">Email : {userInfo.email}</p>
          </div>
          <div className="profile__content">
            {isAchievementsVisible && (
              <>
                <h1 className="profile__achievements">Achievements</h1>
                {achievements.map((achievement) => (
                  <Achievements key={achievement.id} {...achievement} />
                ))}
              </>
            )}
            {isOrdersVisible && (
              <div className="profile__orders">
                <h1>Orders</h1>
                {orders && !isLoading ? (
                  orders.map(({ game, formatedCreatedAt, quantity }) => (
                    <Card
                      key={game.id}
                      purchaseDate={formatedCreatedAt}
                      quantity={quantity}
                      {...game}
                    />
                  ))
                ) : (
                  <p>Loading</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
