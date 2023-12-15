import { createSlice } from '@reduxjs/toolkit';
import { UIArticlesSliceState } from './articles';
import {
  createArticle,
  deleteArticle,
  favoriteArticle,
  getArticle,
  getArticles,
  unFavoriteArticle,
  updateArticle,
} from '../../../ApiService/ArticleService';

const initialState: UIArticlesSliceState = {
  articles: [],
  articlesCount: 0,
  status: 'succeeded',
  error: undefined,
  article: undefined,
};

const ArticlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticle: (state) => {
      state.article = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(getArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.status = 'succeeded';
        state.error = action.error.message;
      });
    builder
      .addCase(createArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createArticle.rejected, (state, payload) => {
        state.status = 'succeeded';
        state.error = payload.error.message;
      });
    builder
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateArticle.rejected, (state, payload) => {
        state.status = 'succeeded';
        state.error = payload.error.message;
      });
    builder
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.article = undefined;
        state.status = 'succeeded';
      })
      .addCase(deleteArticle.rejected, (state, payload) => {
        state.status = 'succeeded';
        state.error = payload.error.message;
      });
    builder
      .addCase(favoriteArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((el) => {
          if (el.slug === action.payload.slug) {
            return { ...action.payload };
          }
          return { ...el };
        });
        state.status = 'succeeded';
      })
      .addCase(favoriteArticle.rejected, (state, payload) => {
        state.status = 'succeeded';
        state.error = payload.error.message;
      });
    builder
      .addCase(unFavoriteArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(unFavoriteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((el) => {
          if (el.slug === action.payload.slug) {
            return { ...action.payload };
          }
          return { ...el };
        });
        state.status = 'succeeded';
      })
      .addCase(unFavoriteArticle.rejected, (state, payload) => {
        state.status = 'succeeded';
        state.error = payload.error.message;
      });
  },
});

export const ArticlesReducer = ArticlesSlice.reducer;
export const { clearArticle } = ArticlesSlice.actions;
