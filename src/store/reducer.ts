import { combineReducers } from '@reduxjs/toolkit';
import offersReducer from './offer-slice';
import cityReducer from './city-slice';
import authReducer from './auth-slice';

export const reducer = combineReducers({
    offers: offersReducer,
    city: cityReducer,
    auth: authReducer,
});