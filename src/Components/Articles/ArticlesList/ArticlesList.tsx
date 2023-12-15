import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './ArticlesList.scss';
import { ArticlesCard } from '..';
import { getArticles } from '../../../ApiService/ArticleService';

type PropsType = {};
export const ArticlesList: React.FC<PropsType> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArticles('0'));
  }, []);
  const { articles, articlesCount } = useAppSelector(
    (state) => state.articleStore
  );
  const onChangePagination = (page: number) => {
    window.scroll(0, 0);
    if (page === 1) {
      dispatch(getArticles('0'));
    }
    dispatch(getArticles(String(page * 5 - 5)));
  };
  return (
    <div className="articleslist">
      <div className="articleslist_articles">
        {articles.map((el) => (
          <ArticlesCard cardType key={el.slug} articles={el} />
        ))}
      </div>
      <Pagination
        onChange={(page) => {
          onChangePagination(page);
        }}
        defaultCurrent={1}
        pageSize={5}
        defaultPageSize={5}
        total={articlesCount}
        showSizeChanger={false}
      />
    </div>
  );
};
