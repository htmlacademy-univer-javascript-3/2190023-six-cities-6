import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance, AxiosError } from 'axios';
import { setAuthorizationStatus, AuthorizationStatus } from './auth-slice';

type LoginData = {
  email: string;
  password: string;
};

export const login = createAsyncThunk<void, LoginData, { extra: AxiosInstance }>(
  'auth/login',
  async (loginData, { extra: api, dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/login', loginData);
      const { token } = response.data;
      localStorage.setItem('six-cities-token', token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        return rejectWithValue('Invalid email or password');
      }
      dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
      return rejectWithValue(`Authorization error: ${axiosError.message}`);
    }
  }
);

export const checkAuth = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'auth/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    try {
      await api.get('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
      } else {
        dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));
      }
    }
  }
);