import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';

export const changeCity = createAction<string>('city/changeCity');
export const fillOffers = createAction<Offer[]>('offers/fillOffers'); // я использую thunk, так что этот экшн не нужен (пока оставлю, вдруг потом пригодится)
export const clearFavorites = createAction('favorites/clearfavorites');