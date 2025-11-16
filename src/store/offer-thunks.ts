import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';

// для того чтобы затестить. на сервере все офферы не помечены как isFavorite
const TEST_FAVORITE_IDS = [
    "4b4e4d35-fed3-4c2d-917f-9414ad9a27e1",
    "5a0bf62c-3351-4799-88d8-935036574480",
    "bf1f1426-4837-4e3a-ae80-783e6459c348"
]

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
    'offers/fetchOffers',
    async (_arg, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Offer[]>('/offers');
            // const patchedData = data.map(offer => 
            //     TEST_FAVORITE_IDS.includes(offer.id)
            //         ? { ...offer, isFavorite: true }
            //         : offer
            //     );
            // return patchedData;
            return data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch offers: ${error}`);
        }
    }
);