import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  UIArticle,
  UIArticlesResponse,
} from '../store/Reducers/ArticlesReducer/articles';

const API = `https://blog.kata.academy/api/articles`;
export const getArticles = createAsyncThunk<UIArticlesResponse, string>(
  'getArticles',
  async (offset) => {
    const response = await axios.get<UIArticlesResponse>(
      `${API}?limit=5&offset=${offset}`
    );
    return response.data;
  }
);
export const getArticle = createAsyncThunk<UIArticle, string>(
  'getArticle',
  async (slug) => {
    const token = localStorage.getItem('token');
    const response = await axios.get<{ article: UIArticle }>(`${API}/${slug}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data.article;
  }
);
type UIArticleResponse = {
  article: UIArticle;
};
export const createArticle = createAsyncThunk<UIArticle, UIArticle>(
  'createArticle',
  async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.post<UIArticleResponse>(
      API,
      { article: data },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response.data.article;
  }
);
export const updateArticle = createAsyncThunk<
  UIArticle,
  { article: UIArticle; slug: string }
>('updateArticle', async ({ article, slug }) => {
  const token = localStorage.getItem('token');
  const response = await axios.put<UIArticleResponse>(
    `${API}/${slug}`,
    { article },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  );
  return response.data.article;
});
export const favoriteArticle = createAsyncThunk<UIArticle, string>(
  'favoriteArticle',
  async (slug) => {
    const token = localStorage.getItem('token');
    const response = await axios.post<UIArticleResponse>(
      `${API}/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response.data.article;
  }
);
export const unFavoriteArticle = createAsyncThunk<UIArticle, string>(
  'unFavoriteArticle',
  async (slug) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete<UIArticleResponse>(
      `${API}/${slug}/favorite`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response.data.article;
  }
);
export const deleteArticle = createAsyncThunk<UIArticleResponse, string>(
  'deleteArticle',
  async (slug) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API}/${slug}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  }
);
