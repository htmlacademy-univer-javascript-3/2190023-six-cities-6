import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import { setAuthorizationStatus, AuthorizationStatus } from './auth-slice';

export const checkAuth = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
    'auth/checkAuth',
    async (_arg, { extra: api, dispatch }) => {
        try {
            await api.get('/login');
            dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
        } catch (error: any) {
            if (error.response?.status === 401) {
                dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
            } else {
                dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));
            }
        }
    }
);