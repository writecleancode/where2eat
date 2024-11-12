import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from 'src/hooks/useLoading';
import { usePlaces } from 'src/hooks/usePlaces';
import { useSort } from 'src/hooks/useSort';
import { sortOptions } from 'src/mocks/data/sortOptions';
import { handleFavouriteStaus, handleVisitedStaus, setCateringEstablishments } from 'src/store';
import { CateringEstablishmentsContextType, CateringEstablishmentsProviderProps, catetingEstablishmentsType } from 'src/types/types';

const initialLoadingState = true;
const initialSearchState = false;

export const CateringEstablishmentsContext = createContext<CateringEstablishmentsContextType>({
	cateringEstablishments: [],
	setSortedCateringEstablishments: () => {},
	isLoading: initialLoadingState,
	selectValue: '',
	setSelectValue: () => {},
	isSearchActive: initialSearchState,
	handleSearchState: () => {},
	getSortedCateringEstablishments: async () => {},
	toggleVisitedStatus: () => {},
	toggleFavouriteStaus: () => {},
});

export const CateringEstablishmentsProvider = ({ children }: CateringEstablishmentsProviderProps) => {
	const cateringEstablishments = useSelector(state => state.cateringEstablishments);
	const dispatch = useDispatch();
	const [selectValue, setSelectValue] = useState(sortOptions[0].value);
	const [isSearchActive, setSearchState] = useState(initialSearchState);
	const { isLoading, setLoadingCompleted } = useLoading();
	const { getCateringEstablishments } = usePlaces();
	const { handleSortPlaces } = useSort();

	const setSortedCateringEstablishments = (placesToSort: catetingEstablishmentsType[]) => {
		dispatch(setCateringEstablishments({ cateringEstablishments: handleSortPlaces(placesToSort, selectValue) }));
	};

	const getSortedCateringEstablishments = async (category: string | undefined, type: string | undefined) => {
		const data = await getCateringEstablishments(category, type);
		setSortedCateringEstablishments(data);
		setLoadingCompleted();
	};

	const toggleVisitedStatus = (index: number) => {
		dispatch(handleVisitedStaus({ index }));
	};

	const toggleFavouriteStaus = (index: number) => {
		dispatch(handleFavouriteStaus({ index }));
	};

	const handleSearchState = (searchPhrase: string) => {
		if (searchPhrase !== '' && isSearchActive === true) return;

		searchPhrase === '' ? setSearchState(false) : setSearchState(true);
	};

	return (
		<CateringEstablishmentsContext.Provider
			value={{
				cateringEstablishments,
				setSortedCateringEstablishments,
				isLoading,
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
