import { createSlice } from '@reduxjs/toolkit';
import { changeCity } from './action';

const initialCity = 'Paris';

export const citySlice = createSlice({
    name: 'city',
    initialState: initialCity,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(changeCity, (_state, action) => action.payload);
    },
});

export default citySlice.reducer;