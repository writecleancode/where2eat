import { useContext, useEffect, useState } from 'react';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import { usePlaces } from 'src/hooks/usePlaces';
import { useSort } from 'src/hooks/useSort';
import { basePath } from 'src/utils/base-path';
import { SelectArrowDown, StyledOption, StyledSelect, Wrapper } from './SortSelect.styles';

export const SortSelect = () => {
	const [sortOptions, setSortOptions] = useState([]);
	const { selectValue, setSelectValue, cateringEstablishments, setCateringEstablishments } = useContext(CateringEstablishmentsContext);
	const { getSortOptions } = usePlaces();
	const { handleSortPlaces } = useSort();

	useEffect(() => {
		(async () => {
			const data = await getSortOptions();
			setSortOptions(data);
		})();
	}, []);

	useEffect(() => {
		if (!cateringEstablishments.length) return;

		const data = handleSortPlaces(cateringEstablishments, selectValue);
		setCateringEstablishments(data);
	}, [selectValue]);

	return (
		<Wrapper>
			<StyledSelect title='sort' onChange={e => setSelectValue(e.target.value)}>
				{sortOptions.map(({ text, value }) => (
					<StyledOption key={value} value={value}>
						{text}
					</StyledOption>
				))}
			</StyledSelect>
			<SelectArrowDown src={`${basePath}/icons/arrow-down.svg`} alt='' />
		</Wrapper>
	);
};
