import { createContext, useState } from 'react';
import { sortOptions } from 'src/data/sortOptions';
import {
	CateringEstablishmentsContextType,
	CateringEstablishmentsProviderProps,
	catetingEstablishmentsType,
} from 'src/types/types';

export const CateringEstablishmentsContext = createContext<CateringEstablishmentsContextType>({
	cateringEstablishments: [],
	setCateringEstablishments: () => {},
	setSortedCateringEstablishments: () => {},
	selectValue: '',
	setSelectValue: () => {},
});

export const CateringEstablishmentsProvider = ({ children }: CateringEstablishmentsProviderProps) => {
	const [cateringEstablishments, setCateringEstablishments] = useState<never[] | catetingEstablishmentsType[]>([]);
	const [selectValue, setSelectValue] = useState(sortOptions[0].value);

	const setSortedCateringEstablishments = (placesToSort: catetingEstablishmentsType[]) => {
		setCateringEstablishments(() => {
			switch (selectValue) {
				case 'byAlphabet':
					return placesToSort.sort((a, b) => {
						if (a.name < b.name) {
							return -1;
						} else if (a.name > b.name) {
							return 1;
						} else {
							return 0;
						}
					});

				case 'byAlphabetReverse':
					return placesToSort.sort((a, b) => {
						if (a.name < b.name) {
							return 1;
						} else if (a.name > b.name) {
							return -1;
						} else {
							return 0;
						}
					});

				case 'byDistanceFromClosest':
					return placesToSort.sort((a, b) => {
						if (Number(a.distance) < Number(b.distance)) {
							return -1;
						} else if (Number(a.distance) > Number(b.distance)) {
							return 1;
						} else {
							return 0;
						}
					});

				case 'byDistanceFromFartest':
					return placesToSort.sort((a, b) => {
						if (Number(a.distance) < Number(b.distance)) {
							return 1;
						} else if (Number(a.distance) > Number(b.distance)) {
							return -1;
						} else {
							return 0;
						}
					});

				case 'byRatingsFromHighest':
					return placesToSort.sort((a, b) => {
						if (Number(a.ratings) < Number(b.ratings)) {
							return 1;
						} else if (Number(a.ratings) > Number(b.ratings)) {
							return -1;
						} else {
							return 0;
						}
					});

				case 'byRatingsFromLowest':
					return placesToSort.sort((a, b) => {
						if (Number(a.ratings) < Number(b.ratings)) {
							return -1;
						} else if (Number(a.ratings) > Number(b.ratings)) {
							return 1;
						} else {
							return 0;
						}
					});

				case 'byPriceFromLowest':
					return placesToSort.sort((a, b) => {
						if (a.prices < b.prices) {
							return -1;
						} else if (a.prices > b.prices) {
							return 1;
						} else {
							return 0;
						}
					});

				case 'byPriceFromHighest':
					return placesToSort.sort((a, b) => {
						if (a.prices < b.prices) {
							return 1;
						} else if (a.prices > b.prices) {
							return -1;
						} else {
							return 0;
						}
					});

				default:
					return placesToSort;
			}
		});
	};

	return (
		<CateringEstablishmentsContext.Provider
			value={{
				cateringEstablishments,
				setCateringEstablishments,
				setSortedCateringEstablishments,
				selectValue,
				setSelectValue,
			}}>
			{children}
		</CateringEstablishmentsContext.Provider>
	);
};
