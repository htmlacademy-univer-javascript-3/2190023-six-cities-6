import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';
import type { Review } from '../types/review';

// для того чтобы затестить. на сервере все офферы не помечены как isFavorite
// const TEST_FAVORITE_IDS = [
//     "4b4e4d35-fed3-4c2d-917f-9414ad9a27e1",
//     "5a0bf62c-3351-4799-88d8-935036574480",
//     "bf1f1426-4837-4e3a-ae80-783e6459c348"
// ]

export const fetchOffer = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'offers/fetchOffer',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer>(`/offers/${id}`)
      return data;
    } catch (err) {
      return rejectWithValue(`Failed to fetch offer: ${err}`);
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, { extra: AxiosInstance }>(
    'offers/fetchNearbyOffers',
    async (id, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
            return data;
        } catch (err){
            return rejectWithValue(`Failed to fetch nearby offers: ${err}`);
        }
    }
);

export const fetchReviews = createAsyncThunk<Review[], string, { extra: AxiosInstance }> (
    'offers/fetchReviews',
    async (id, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Review[]>(`/comments/${id}`);
            return data;
        } catch (err) {
            return rejectWithValue(`Failed to fetch reviews: ${err}`);
        }
    }
);


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

type PostCommentArgs = {
    offerId: string;
    comment: string;
    rating: number;
};

export const postComment = createAsyncThunk<void, PostCommentArgs, { extra: AxiosInstance }>(
    'offers/postComment',
    async ({ offerId, comment, rating }, { extra: api, dispatch, rejectWithValue }) => {
        try { 
            await api.post(`/comments/${offerId}`, { comment, rating });
            dispatch(fetchReviews(offerId));
        } catch (error: any) {
            return rejectWithValue(`Failed to post comment: ${error}`);
        }
    }
);