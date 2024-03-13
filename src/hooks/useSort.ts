import { catetingEstablishmentsType } from 'src/types/types';

export const useSort = () => {
	const handleSortPlaces = (cateringEstablishments: catetingEstablishmentsType[], sortValue: string) => {
		switch (sortValue) {
			case 'byAlphabet':
				return cateringEstablishments.toSorted((a, b) => {
					if (a.name < b.name) {
						return -1;
					} else if (a.name > b.name) {
						return 1;
					} else {
						return 0;
					}
				});

			case 'byAlphabetReverse':
				return cateringEstablishments.toSorted((a, b) => {
					if (a.name < b.name) {
						return 1;
					} else if (a.name > b.name) {
						return -1;
					} else {
						return 0;
					}
				});

			case 'byDistanceFromClosest':
				return cateringEstablishments.toSorted((a, b) => {
					if (Number(a.distance) < Number(b.distance)) {
						return -1;
					} else if (Number(a.distance) > Number(b.distance)) {
						return 1;
					} else {
						return 0;
					}
				});

			case 'byDistanceFromFartest':
				return cateringEstablishments.toSorted((a, b) => {
					if (Number(a.distance) < Number(b.distance)) {
						return 1;
					} else if (Number(a.distance) > Number(b.distance)) {
						return -1;
					} else {
						return 0;
					}
				});

			case 'byRatingsFromHighest':
				return cateringEstablishments.toSorted((a, b) => {
					if (Number(a.ratings) < Number(b.ratings)) {
						return 1;
					} else if (Number(a.ratings) > Number(b.ratings)) {
						return -1;
					} else {
						return 0;
					}
				});

			case 'byRatingsFromLowest':
				return cateringEstablishments.toSorted((a, b) => {
					if (Number(a.ratings) < Number(b.ratings)) {
						return -1;
					} else if (Number(a.ratings) > Number(b.ratings)) {
						return 1;
					} else {
						return 0;
					}
				});

			case 'byPriceFromLowest':
				return cateringEstablishments.toSorted((a, b) => {
					if (a.prices < b.prices) {
						return -1;
					} else if (a.prices > b.prices) {
						return 1;
					} else {
						return 0;
					}
				});

			case 'byPriceFromHighest':
				return cateringEstablishments.toSorted((a, b) => {
					if (a.prices < b.prices) {
						return 1;
					} else if (a.prices > b.prices) {
						return -1;
					} else {
						return 0;
					}
				});

			default:
				return cateringEstablishments;
		}
	};

	return {
		handleSortPlaces,
	};
};
