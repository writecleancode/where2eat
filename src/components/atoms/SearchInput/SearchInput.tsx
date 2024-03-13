import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import { usePlaces } from 'src/hooks/usePlaces';
import { debounce } from 'lodash';
import { StyledIcon, StyledInput, Wrapper } from './SearchInput.styles';

export const SearchInput = () => {
	const [inputValue, setInputValue] = useState('');
	const { currentCategory } = useContext(CategoryContext);
	const { currentType } = useContext(TypeContext);
	const { setSortedCateringEstablishments } = useContext(CateringEstablishmentsContext);
	const { findPlaces } = usePlaces();

	const getMatchingPlaces = useCallback(
		debounce(async (searchPhrase: string) => {
			const matchingPlaces = await findPlaces(currentCategory, currentType, searchPhrase);
			setSortedCateringEstablishments(matchingPlaces);
		}, 500),
		[currentCategory, currentType]
	);

	const handleSearchInput = async (e: FormEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);

		if (!currentCategory || !currentType) return;
		getMatchingPlaces(e.currentTarget.value);
	};

	useEffect(() => {
		setInputValue('');
	}, [currentCategory, currentType]);

	return (
		<Wrapper>
			<StyledInput type='text' aria-label='search' value={inputValue} onChange={handleSearchInput} />
			<StyledIcon src='/src/assets/icons/search.svg' alt='' />
		</Wrapper>
	);
};
