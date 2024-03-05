import { sortOptions } from 'src/data/sortOptions';
import { SelectArrowDown, StyledOption, StyledSelect, Wrapper } from './SortSelect.styles';

export const SortSelect = () => {
	return (
		<Wrapper>
			<StyledSelect title='sort'>
				{sortOptions.map(({ text, value }) => (
					<StyledOption key={value} value={value}>
						{text}
					</StyledOption>
				))}
			</StyledSelect>
			<SelectArrowDown src='/src/assets/icons/arrow-down.svg' alt='' />
		</Wrapper>
	);
};
