import React from 'react';
import './Header.scss';
import { Button } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { User } from '../Profile';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearArticle, signOut } from '../../store/Reducers';

type PropsType = {};
const Header: React.FC<PropsType> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { auth, user } = useAppSelector((state) => state.userStore);
  const onSignOut = () => {
    dispatch(signOut());
  };
  const onNewArticle = () => {
    dispatch(clearArticle());
    history.push('/create');
  };
  const isAuthUser = () => {
    return (
      <div className="header_inner_profile">
        <Button
          onClick={onNewArticle}
          className="header_inner_profile_createbtn"
        >
          Create article
        </Button>
        <User
          editProfile="/edit-profile"
          img={user.image}
          name={user.username}
          date={false}
        />
        <Button onClick={onSignOut}>LogOut</Button>
      </div>
    );
  };
  return (
    <div className="header">
      <div className="header_inner">
        <div className="header_inner_logo">Realworld Blog</div>
        {auth ? (
          isAuthUser()
        ) : (
          <div className="header_inner_profile">
            <div className="header_inner_profile_signin">
              <NavLink to="/sign-in">Sign In</NavLink>
            </div>
            <div className="header_inner_profile_signup">
              <NavLink to="/sign-up">
                <Button>Sign Up</Button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
