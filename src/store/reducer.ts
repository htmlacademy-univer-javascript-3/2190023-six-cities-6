import { combineReducers } from '@reduxjs/toolkit';
import offersReducer from './offer-slice';
import cityReducer from './city-slice';

export const reducer = combineReducers({
    offers: offersReducer,
    city: cityReducer,
});