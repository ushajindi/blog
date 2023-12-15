import React from 'react';
import { Avatar, Typography } from 'antd';
import avatar from '../../../public/image/img.png';
import './User.scss';
import { NavLink } from 'react-router-dom';

type PropsType = {
  name: string;
  img: string | undefined;
  date: string | boolean;
  editProfile: string | undefined;
};
export const User: React.FC<PropsType> = ({ name, date, img, editProfile }) => {
  return (
    <div className="user">
      <div className="user_title">
        <b>{name}</b>
        {date && (
          <div className="user_title_date">
            <Typography.Text>{date}</Typography.Text>
          </div>
        )}
      </div>
      <div className="user_img">
        {editProfile ? (
          <NavLink to={editProfile}>
            <Avatar size={46} src={img || avatar} />
          </NavLink>
        ) : (
          <Avatar size={46} src={img || avatar} />
        )}
      </div>
    </div>
  );
};
