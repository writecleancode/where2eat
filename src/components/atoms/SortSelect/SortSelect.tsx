import { useContext, useEffect } from 'react';
import { sortOptions } from 'src/data/sortOptions';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import { SelectArrowDown, StyledOption, StyledSelect, Wrapper } from './SortSelect.styles';

export const SortSelect = () => {
	const { selectValue, setSelectValue } = useContext(CateringEstablishmentsContext);
	const { cateringEstablishments, setCateringEstablishments } = useContext(CateringEstablishmentsContext);

	useEffect(() => {
		if (!cateringEstablishments.length) return;

		switch (selectValue) {
			case 'byAlphabet':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (a.name < b.name) {
							return -1;
						} else if (a.name > b.name) {
							return 1;
						} else {
							return 0;
						}
					})
				);
				break;

			case 'byAlphabetReverse':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (a.name < b.name) {
							return 1;
						} else if (a.name > b.name) {
							return -1;
						} else {
							return 0;
						}
					})
				);
				break;

			case 'byDistanceFromClosest':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (Number(a.distance) < Number(b.distance)) {
							return -1;
						} else if (Number(a.distance) > Number(b.distance)) {
							return 1;
						} else {
							return 0;
						}
					})
				);
				break;

			case 'byDistanceFromFartest':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (Number(a.distance) < Number(b.distance)) {
							return 1;
						} else if (Number(a.distance) > Number(b.distance)) {
							return -1;
						} else {
							return 0;
						}
					})
				);
				break;

			case 'byRatingsFromHighest':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (Number(a.ratings) < Number(b.ratings)) {
							return 1;
						} else if (Number(a.ratings) > Number(b.ratings)) {
							return -1;
						} else {
							return 0;
						}
					})
				);
				break;

			case 'byRatingsFromLowest':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (Number(a.ratings) < Number(b.ratings)) {
							return -1;
						} else if (Number(a.ratings) > Number(b.ratings)) {
							return 1;
						} else {
							return 0;
						}
					})
				);
				break;

			case 'byPriceFromLowest':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (a.prices < b.prices) {
							return -1;
						} else if (a.prices > b.prices) {
							return 1;
						} else {
							return 0;
						}
					})
				);
				break;

			case 'byPriceFromHighest':
				setCateringEstablishments(
					cateringEstablishments.toSorted((a, b) => {
						if (a.prices < b.prices) {
							return 1;
						} else if (a.prices > b.prices) {
							return -1;
						} else {
							return 0;
						}
					})
				);
				break;

			default:
				break;
		}
	}, [selectValue]);

	return (
		<Wrapper>
			<StyledSelect title='sort' onChange={e => setSelectValue(e.currentTarget.value)}>
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
