import { combineReducers, configureStore } from '@reduxjs/toolkit';
import offersReducer from './offer-slice';
import cityReducer from './city-slice';
import authReducer from './auth-slice';
import { api } from '../api';

export const reducer = combineReducers({
    offers: offersReducer,
    city: cityReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: api,
        },
    }),
});