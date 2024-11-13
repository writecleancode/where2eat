import { catetingEstablishmentsType } from 'src/types/types';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialcateringEstablishments: catetingEstablishmentsType[] = [];

const cateringEstablishmentsSlice = createSlice({
	name: 'cateringEstablishments',
	initialState: initialcateringEstablishments,
	reducers: {
		setCateringEstablishments(state, action) {
			state.at(0); // this line is just TypeScript not to display warning that "'state' is declaed but the value is never read"
			return action.payload;
		},

		handleVisitedStatus(state, action) {
			const index = action.payload;
			state[index].isVisited = !state[index].isVisited;
		},

		handleFavouriteStaus(state, action) {
			const index = action.payload;
			state[index].isFavourite = !state[index].isFavourite;
		},
	},
});

export const { setCateringEstablishments, handleVisitedStatus, handleFavouriteStaus } = cateringEstablishmentsSlice.actions;

export const store = configureStore({
	reducer: {
		cateringEstablishments: cateringEstablishmentsSlice.reducer,
	},
});
