import { createSlice } from '@reduxjs/toolkit';

export type AuthorizationStatus = 'authorized' | 'unauthorized' | 'unknown';

export const AuthorizationStatus = {
    Authorized: 'authorized' as AuthorizationStatus,
    Unauthorized: 'unauthorized' as AuthorizationStatus,
    Unknown: 'unknown' as AuthorizationStatus,
};

type AuthState = {
    authorizationStatus: AuthorizationStatus;
};

const initialState: AuthState = {
    authorizationStatus: AuthorizationStatus.Unknown,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthorizationStatus(state, action) {
            state.authorizationStatus = action.payload;
        },
    },
});

export const { setAuthorizationStatus } = authSlice.actions;
export default authSlice.reducer;