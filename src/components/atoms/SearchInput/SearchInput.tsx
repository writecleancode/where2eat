import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import axios from 'axios';
import { debounce } from 'lodash';
import { StyledIcon, StyledInput, Wrapper } from './SearchInput.styles';

export const SearchInput = () => {
	const [inputValue, setInputValue] = useState('');
	const { currentCategory } = useContext(CategoryContext);
	const { currentType } = useContext(TypeContext);
	const { setSortedCateringEstablishments } = useContext(CateringEstablishmentsContext);

	const findPlaces = async (searchPhrase: string) => {
		if (!currentCategory || !currentType) return;

		try {
			const { data } = await axios.post(`/${currentCategory}/${currentType}`, { searchPhrase: searchPhrase });
			return data.matchingCateringEstablishments;
		} catch (error) {
			console.log(error);
		}
	};

	const getMatchingPlaces = useCallback(
		debounce(async (searchPhrase: string) => {
			const matchingPlaces = await findPlaces(searchPhrase);
			setSortedCateringEstablishments(matchingPlaces);
		}, 500),
		[currentCategory, currentType]
	);

	const handleSearchInput = async (e: FormEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);
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
