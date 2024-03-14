import { createContext, useState } from 'react';
import { usePlaces } from 'src/hooks/usePlaces';
import { useSort } from 'src/hooks/useSort';
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
	getSortedCateringEstablishments: async () => {},
	toggleVisitedStatus: () => {},
	toggleFavouriteStaus: () => {},
});

export const CateringEstablishmentsProvider = ({ children }: CateringEstablishmentsProviderProps) => {
	const [cateringEstablishments, setCateringEstablishments] = useState<never[] | catetingEstablishmentsType[]>([]);
	const [selectValue, setSelectValue] = useState(sortOptions[0].value);
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

	return (
		<CateringEstablishmentsContext.Provider
			value={{
				cateringEstablishments,
				setCateringEstablishments,
				setSortedCateringEstablishments,
				selectValue,
				setSelectValue,
				getSortedCateringEstablishments,
				toggleVisitedStatus,
				toggleFavouriteStaus,
			}}>
			{children}
		</CateringEstablishmentsContext.Provider>
	);
};
