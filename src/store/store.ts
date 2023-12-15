import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ArticlesReducer, UserReducer } from './Reducers';

const rootReducer = combineReducers({
  articleStore: ArticlesReducer,
  userStore: UserReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
