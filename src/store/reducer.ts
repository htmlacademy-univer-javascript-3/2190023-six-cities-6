import { createReducer } from '@reduxjs/toolkit';
import type { Offer } from '../mocks/offers';
import { changeCity, fillOffers } from './action';

export type State = {
    city: string;
    offers: Offer[];
};

const initialState: State = {
    city: 'Paris',
    offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(fillOffers, (state, action) => {
            state.offers = action.payload;
        })
});