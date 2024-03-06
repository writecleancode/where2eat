import { MainTemplate } from 'src/components/templates/MainTemplate/MainTemplate';
import { SortSelect } from 'src/components/atoms/SortSelect/SortSelect';
import { SearchInput } from 'src/components/atoms/SearchInput/SearchInput';
import { CateringEstablishmentCards } from 'src/components/organisms/CateringEstablishmentCards/CateringEstablishmentCards';
import { ControlsWrapper, Wrapper } from './Root.styles';

export const Root = () => {
	return (
		<MainTemplate>
			<Wrapper>
				<ControlsWrapper>
					<SortSelect />
					<SearchInput />
				</ControlsWrapper>
				<CateringEstablishmentCards />
			</Wrapper>
		</MainTemplate>
	);
};
