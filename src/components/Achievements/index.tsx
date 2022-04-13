import React from 'react';
import classNames from 'classnames';

import { IAchievement } from 'types/interfaces';

import achievementImg from 'assets/achievement.png';

import './style.scss';

export const Achievements: React.FC<IAchievement> = ({ achievement, isAchieved }) => {
  return (
    <div
      className={classNames('achievement', {
        'achievement--achieved': isAchieved,
      })}
    >
      <img src={achievementImg} className="achievement__logo" />
      <div className="achievement__info">
        <p className="achievement__name">{achievement.name}</p>
        <div className="achievement__side-info">
          <p className="achievement__description">{achievement.description}</p>
          <p className="achievement__discount">{achievement.discount * 100}%</p>
        </div>
      </div>
    </div>
  );
};
