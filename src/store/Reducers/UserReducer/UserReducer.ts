import { createSlice } from '@reduxjs/toolkit';
import { UIUserSlice } from './user';
import { editProfile, signIn, signUp } from '../../../ApiService/AuthService';

const initialState: UIUserSlice = {
  auth: false,
  error: {
    message: undefined,
    code: undefined,
  },
  status: 'succeeded',
  token: '',
  user: {
    email: '',
    username: '',
    password: '',
    image: '',
    bio: '',
  },
};

const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem('token');
      state.auth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.error.message = undefined;
        state.error.code = undefined;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error.message = undefined;
        state.error.code = undefined;
        localStorage.setItem('token', action.payload.user.token);
        state.auth = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'succeeded';
        state.error.message = action.error.message;
        state.error.code = action.error.code;
      });
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error.message = undefined;
        state.error.code = undefined;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.auth = true;
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error.message = undefined;
        state.error.code = undefined;
        localStorage.setItem('token', action.payload.user.token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'succeeded';
        state.error.message = action.error.message;
        state.error.code = action.error.code;
      });
    builder
      .addCase(editProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error.message = action.error.message;
        state.error.code = action.error.code;
      });
  },
});

export const UserReducer = UserSlice.reducer;
export const { signOut } = UserSlice.actions;
