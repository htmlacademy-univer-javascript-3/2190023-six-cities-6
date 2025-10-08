import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

export const selectFavoriteCount = createSelector(
    [(state: RootState) => state.offers.items],
    (offers) => offers.filter((offer) => offer.isFavorite).length
);

export const selectAuthorizationStatus = (state: RootState) => state.auth.authorizationStatus;