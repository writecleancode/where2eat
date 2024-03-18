import { createContext, useState } from 'react';
import { usePlaces } from 'src/hooks/usePlaces';
import { useSort } from 'src/hooks/useSort';
import { sortOptions } from 'src/data/sortOptions';
import {
	CateringEstablishmentsContextType,
	CateringEstablishmentsProviderProps,
	catetingEstablishmentsType,
} from 'src/types/types';

const initialSearchState = false;

export const CateringEstablishmentsContext = createContext<CateringEstablishmentsContextType>({
	cateringEstablishments: [],
	setCateringEstablishments: () => {},
	setSortedCateringEstablishments: () => {},
	selectValue: '',
	setSelectValue: () => {},
	isSearchActive: initialSearchState,
	handleSearchState: () => {},
	getSortedCateringEstablishments: async () => {},
	toggleVisitedStatus: () => {},
	toggleFavouriteStaus: () => {},
});

export const CateringEstablishmentsProvider = ({ children }: CateringEstablishmentsProviderProps) => {
	const [cateringEstablishments, setCateringEstablishments] = useState<never[] | catetingEstablishmentsType[]>([]);
	const [selectValue, setSelectValue] = useState(sortOptions[0].value);
	const [isSearchActive, setSearchState] = useState(initialSearchState);
	const { getCateringEstablishments } = usePlaces();
	const { handleSortPlaces } = useSort();

	const setSortedCateringEstablishments = (placesToSort: catetingEstablishmentsType[]) => {
		setCateringEstablishments(handleSortPlaces(placesToSort, selectValue));
	};

	const getSortedCateringEstablishments = async (category: string | undefined, type: string | undefined) => {
		const data = await getCateringEstablishments(category, type);
		setSortedCateringEstablishments(data);
	};

	const toggleVisitedStatus = (index: number) => {
		setCateringEstablishments([
			...cateringEstablishments.slice(0, index),
			{ ...cateringEstablishments[index], isVisited: !cateringEstablishments[index].isVisited },
			...cateringEstablishments.slice(index + 1),
		]);
	};

	const toggleFavouriteStaus = (index: number) => {
		setCateringEstablishments([
			...cateringEstablishments.slice(0, index),
			{ ...cateringEstablishments[index], isFavourite: !cateringEstablishments[index].isFavourite },
			...cateringEstablishments.slice(index + 1),
		]);
	};

	const handleSearchState = (searchPhrase: string) => {
		if (searchPhrase !== '' && isSearchActive === true) return;

		searchPhrase === '' ? setSearchState(false) : setSearchState(true);
	};

	return (
		<CateringEstablishmentsContext.Provider
			value={{
				cateringEstablishments,
				setCateringEstablishments,
				setSortedCateringEstablishments,
				selectValue,
				setSelectValue,
				isSearchActive,
				handleSearchState,
				getSortedCateringEstablishments,
				toggleVisitedStatus,
				toggleFavouriteStaus,
			}}>
			{children}
		</CateringEstablishmentsContext.Provider>
	);
};
