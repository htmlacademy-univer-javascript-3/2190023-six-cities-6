import { createSlice } from '@reduxjs/toolkit';
import { fetchOffers } from './offer-thunks';
import type { Offer } from '../types/offer';

type OffersState = {
    items: Offer[];
    isLoading: boolean;
    error: string | null;
};

const initialState: OffersState = {
    items: [],
    isLoading: false,
    error: null,
}

export const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOffers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOffers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchOffers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            });
    },
});

export default offersSlice.reducer;