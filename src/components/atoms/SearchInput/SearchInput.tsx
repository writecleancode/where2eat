import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import { usePlaces } from 'src/hooks/usePlaces';
import { debounce } from 'lodash';
import { IconWrapper, StyledIcon, StyledInput, Wrapper } from './SearchInput.styles';

export const SearchInput = () => {
	const [inputValue, setInputValue] = useState('');
	const { currentCategory } = useContext(CategoryContext);
	const { currentType } = useContext(TypeContext);
	const { setSortedCateringEstablishments, handleSearchState } = useContext(CateringEstablishmentsContext);
	const { findPlaces } = usePlaces();

	const getMatchingPlaces = useCallback(
		debounce(async (searchPhrase: string) => {
			const matchingPlaces = await findPlaces(currentCategory, currentType, searchPhrase);
			setSortedCateringEstablishments(matchingPlaces);

			handleSearchState(searchPhrase);
		}, 500),
		[currentCategory, currentType, setSortedCateringEstablishments]
	);

	const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);

		if (!currentCategory || !currentType) return;
		getMatchingPlaces(e.target.value);
	};

	useEffect(() => {
		setInputValue('');
	}, [currentCategory, currentType]);

	return (
		<Wrapper>
			<StyledInput type='text' aria-label='search' value={inputValue} onChange={handleSearchInput} />
			<IconWrapper>
				<StyledIcon src='/icons/search.svg' alt='' />
			</IconWrapper>
		</Wrapper>
	);
};
