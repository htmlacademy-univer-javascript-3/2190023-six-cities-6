import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
    'offers/fetchOffers',
    async (_arg, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Offer[]>('/offers');
            return data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch offers: ${error}`);
        }
    }
);