import { FormEvent, useContext, useEffect, useState } from 'react';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import { StyledIcon, StyledInput, Wrapper } from './SearchInput.styles';
import axios from 'axios';

export const SearchInput = () => {
	const [inputValue, setInputValue] = useState('');
	const { currentCategory } = useContext(CategoryContext);
	const { currentType } = useContext(TypeContext);
	const { setSortedCateringEstablishments } = useContext(CateringEstablishmentsContext);

	const handleSearchInput = (e: FormEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);

		axios
			.post(`/${currentCategory}/${currentType}`, { searchPhrase: e.currentTarget.value })
			.then(({ data }) => setSortedCateringEstablishments(data.matchingCateringEstablishments))
			.catch(error => console.log(error));
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
