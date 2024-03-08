import { SortSelect } from 'src/components/atoms/SortSelect/SortSelect';
import { SearchInput } from 'src/components/atoms/SearchInput/SearchInput';
import { CateringEstablishmentCards } from 'src/components/organisms/CateringEstablishmentCards/CateringEstablishmentCards';
import { ControlsWrapper, Wrapper } from './CateringEstablishments.styles';

export const CateringEstablishments = () => {
	return (
		<Wrapper>
			<ControlsWrapper>
				<SortSelect />
				<SearchInput />
			</ControlsWrapper>
			<CateringEstablishmentCards />
		</Wrapper>
	);
};
