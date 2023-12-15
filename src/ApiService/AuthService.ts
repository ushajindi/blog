import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UIUser, UIUserResponse } from '../store/Reducers/UserReducer/user';

const URL = 'https://blog.kata.academy/api';

export const signUp = createAsyncThunk<UIUserResponse, { user: UIUser }>(
  'signUp',
  async ({ user }) => {
    const response = await axios.post<UIUserResponse>(`${URL}/users/`, {
      user,
    });
    return response.data;
  }
);

export const signIn = createAsyncThunk<
  UIUserResponse,
  { user: UIUser | undefined; token: string | undefined }
>('signIn', async ({ token, user }) => {
  if (token) {
    const response = await axios.get<UIUserResponse>(`${URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  const response = await axios.post<UIUserResponse>(`${URL}/users/login`, {
    user,
  });
  return response.data;
});

export const editProfile = createAsyncThunk<UIUserResponse, UIUser>(
  'editProfile',
  async (user) => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.put(
        `${URL}/user`,
        {
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    }
    return new Error('Unauthorized');
  }
);
