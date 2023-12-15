import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { User } from '../../Profile';
import { UIArticle } from '../../../store/Reducers/ArticlesReducer/articles';
import Like from '../../Like/Like';
import { formatDate, TextWrap } from '../helpers/helpers';
import {
  deleteArticle,
  favoriteArticle,
  unFavoriteArticle,
} from '../../../ApiService/ArticleService';
import './Articlecard.scss';

type PropsTypes = {
  articles: UIArticle;
  cardType?: boolean;
};

export const ArticlesCard: React.FC<PropsTypes> = ({
  articles: {
    createdAt,
    title,
    tagList,
    author,
    body,
    favorited,
    favoritesCount,
    slug,
  },
  cardType,
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    user: { username },
    auth,
  } = useAppSelector((state) => state.userStore);
  const handleConfirm = () => {
    Modal.confirm({
      content: 'Are you sure you want to delete this item?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        dispatch(deleteArticle(slug));
        history.push('/articles');
      },
      onCancel: () => {},
    });
  };
  const onLiked = (favorite: boolean) => {
    if (auth) {
      if (favorite) {
        dispatch(unFavoriteArticle(slug));
      } else {
        dispatch(favoriteArticle(slug));
      }
    }
  };

  return (
    <div className="article">
      <div className="article_header">
        <div className="article_header_title">
          <NavLink to={`/article/${slug}`}>
            <Typography.Title level={4}>{TextWrap(title)}</Typography.Title>
          </NavLink>
          <div className="article_header_title_like">
            <Like
              onLiked={() => {
                onLiked(favorited);
              }}
              liked={favorited}
              countLikes={favoritesCount}
            />
          </div>
        </div>
        <div className="article_header_user">
          <User
            editProfile={undefined}
            img={author.image}
            name={author.username}
            date={formatDate(createdAt)}
          />
          {!cardType && username === author.username && (
            <div className="article_header_user_btn">
              <Button
                onClick={() => {
                  handleConfirm();
                }}
                danger
              >
                Delete
              </Button>
              <NavLink to="/edit">
                <Button className="article_header_user_btn_edit">Edit</Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="article_tags">
        <div className="article_tags_tag">
          {tagList.map((el, i) => {
            const index = i + new Date().getMilliseconds();
            return (
              <Button key={index * 2} size="small">
                {el}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="article_text">
        <Typography.Text>{body}</Typography.Text>
      </div>
    </div>
  );
};
