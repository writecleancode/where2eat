import { SortSelect } from 'src/components/atoms/SortSelect/SortSelect';
import { SearchInput } from 'src/components/atoms/SearchInput/SearchInput';
import { CateringEstablishmentsCards } from 'src/components/organisms/CateringEstablishmentsCards/CateringEstablishmentsCards';
import { ControlsWrapper, Wrapper } from './CateringEstablishments.styles';

export const CateringEstablishments = () => {
	return (
		<Wrapper>
			<ControlsWrapper>
				<SortSelect />
				<SearchInput />
			</ControlsWrapper>
			<CateringEstablishmentsCards />
		</Wrapper>
	);
};
