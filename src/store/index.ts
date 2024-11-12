import { createStore } from 'redux';

const initialState = {
	cateringEstablishments: [],
};

export const setCateringEstablishments = payload => {
	return {
		type: 'cateringEstablishments/set',
		payload,
	};
};

export const handleVisitedStaus = payload => {
	return {
		type: 'cateringEstablishments/handleVisitedStaus',
		payload,
	};
};

export const handleFavouriteStaus = payload => {
	return {
		type: 'cateringEstablishments/handleFavouriteStaus',
		payload,
	};
};

const cateringEstablishmentsReducer = (state = initialState, action) => {
	let index = null;

	switch (action.type) {
		case 'cateringEstablishments/set':
			return {
				...state,
				cateringEstablishments: action.payload.cateringEstablishments,
			};

		case 'cateringEstablishments/handleVisitedStaus':
			index = action.payload.index;
			return {
				...state,
				cateringEstablishments: [
					...state.cateringEstablishments.slice(0, index),
					{ ...state.cateringEstablishments[index], isVisited: !state.cateringEstablishments[index].isVisited },
					...state.cateringEstablishments.slice(index + 1),
				],
			};

		case 'cateringEstablishments/handleFavouriteStaus':
			index = action.payload.index;
			return {
				...state,
				cateringEstablishments: [
					...state.cateringEstablishments.slice(0, index),
					{ ...state.cateringEstablishments[index], isFavourite: !state.cateringEstablishments[index].isFavourite },
					...state.cateringEstablishments.slice(index + 1),
				],
			};

		default:
			return state;
	}
};

export const store = createStore(cateringEstablishmentsReducer);
