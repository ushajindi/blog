import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getArticle } from '../../../ApiService/ArticleService';
import './Article.scss';
import { ArticlesCard } from '../ArticleCard/ArticleCard';
import { TextWrap } from '../helpers/helpers';

type PropsType = {
  slug: string;
};
export const Article: React.FC<PropsType> = ({ slug }) => {
  const dispatch = useAppDispatch();
  const { article } = useAppSelector((state) => state.articleStore);
  useEffect(() => {
    dispatch(getArticle(slug));
  }, []);
  return (
    article && (
      <div className="fullarticle">
        <div className="fullarticle_card">
          <ArticlesCard cardType={false} articles={article} />
        </div>
        <h2 className="fullarticle_main_title">{TextWrap(article.title)}</h2>
        <div className="fullarticle_main">
          <h3 className="fullarticle_main_subtitle">
            {TextWrap(article.description)}
          </h3>
          <p className="fullarticle_main_text">{TextWrap(article?.body)}</p>
        </div>
      </div>
    )
  );
};
