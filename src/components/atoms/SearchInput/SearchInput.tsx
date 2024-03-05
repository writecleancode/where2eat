import { StyledIcon, StyledInput, Wrapper } from './SearchInput.styles';

export const SearchInput = () => {
	return (
		<Wrapper>
			<StyledInput type='text' aria-label='search' />
			<StyledIcon src='/src/assets/icons/search.svg' alt='' />
		</Wrapper>
	);
};
