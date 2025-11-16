import { createSlice } from '@reduxjs/toolkit';
import { fetchOffers, fetchOffer, fetchNearbyOffers, fetchReviews } from './offer-thunks';
import type { Offer } from '../types/offer';
import type { Review } from '../types/review';

type OffersState = {
    items: Offer[];
    currentOffer: Offer | null;
    nearbyOffers: Offer[];
    reviews: Review[];
    isOffersLoading: boolean;
    isOfferLoading: boolean;
    error: string | null;
};

const initialState: OffersState = {
    items: [],
    currentOffer: null,
    nearbyOffers: [],
    reviews: [],
    isOffersLoading: false,
    isOfferLoading: false,
    error: null,
}

export const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // offers
            .addCase(fetchOffers.pending, (state) => {
                state.isOffersLoading = true;
                state.error = null;
            })
            .addCase(fetchOffers.fulfilled, (state, action) => {
                state.isOffersLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchOffers.rejected, (state, action) => {
                state.isOffersLoading = false;
                state.error = action.payload as string
            })
            // offer
            .addCase(fetchOffer.pending, (state) => {
                state.isOfferLoading = true;
                state.error = null;
                state.currentOffer = null;
            })
            .addCase(fetchOffer.fulfilled, (state, action) => {
                state.isOfferLoading = false;
                state.currentOffer = action.payload;
                // console.log('fetchedOffer fulfilled: ', state.currentOffer);
            })
            .addCase(fetchOffer.rejected, (state, action) => {
                state.isOfferLoading = false;
                state.error = action.payload as string;
                state.currentOffer = null;
            })
            // nearby
            .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
                state.nearbyOffers = action.payload;
                // console.log('fetchedNearbyOffers fulfilled: ', state.nearbyOffers);
            })
            // reviews
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                // console.log('fetchedReviews fulfilled: ', state.reviews);
            });
    },
});

export default offersSlice.reducer;