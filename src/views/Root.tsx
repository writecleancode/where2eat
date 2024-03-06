import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/assets/styles/theme';
import { GlobalStyle } from 'src/assets/styles/GlobalStyle';
import { MainTemplate } from 'src/components/templates/MainTemplate/MainTemplate';
import { SortSelect } from 'src/components/atoms/SortSelect/SortSelect';
import { SearchInput } from 'src/components/atoms/SearchInput/SearchInput';
import { CateringEstablishmentCards } from 'src/components/organisms/CateringEstablishmentCards/CateringEstablishmentCards';
import { ControlsWrapper, Wrapper } from './Root.styles';

export const Root = () => {
	const { isNavOpen } = useContext(NavContext);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle $isNavOpen={isNavOpen} />
			<MainTemplate>
				<Wrapper>
					<ControlsWrapper>
						<SortSelect />
						<SearchInput />
					</ControlsWrapper>
					<CateringEstablishmentCards />
				</Wrapper>
			</MainTemplate>
		</ThemeProvider>
	);
};
