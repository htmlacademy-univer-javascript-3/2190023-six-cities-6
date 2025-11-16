import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
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
    } catch (error: any) {
      if (error.response?.status === 400) {
        return rejectWithValue('Некорректные данные. Проверьте email и пароль.');
      }
      dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
      return rejectWithValue('Ошибка авторизации');
    }
  }
);