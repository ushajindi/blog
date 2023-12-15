import React from 'react';
import './Like.scss';
import likedIco from '../../public/image/liked.svg';
import notLiked from '../../public/image/notliked.svg';

type PropsType = {
  liked: boolean;
  countLikes: number;
  onLiked: () => void;
};
const Like: React.FC<PropsType> = ({ liked, countLikes, onLiked }) => {
  return (
    <div onClick={onLiked} className="like">
      {liked ? <img src={likedIco} alt="" /> : <img src={notLiked} alt="" />}
      {countLikes}
    </div>
  );
};

export default Like;
