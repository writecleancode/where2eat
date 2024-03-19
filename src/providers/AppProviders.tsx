import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/assets/styles/theme';
import { NavProvider } from './NavProvider';
import { CategoryProvider } from './CategoryProvider';
import { TypeProvider } from './TypeProvider';
import { CateringEstablishmentsProvider } from './CateringEstablishmentsProvider';
import { GlobalStyle } from 'src/assets/styles/GlobalStyle';
import { AppProvidersType } from 'src/types/types';

export const AppProviders = ({ children }: AppProvidersType) => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<NavProvider>
					<CategoryProvider>
						<TypeProvider>
							<CateringEstablishmentsProvider>
								<GlobalStyle />
								{children}
							</CateringEstablishmentsProvider>
						</TypeProvider>
					</CategoryProvider>
				</NavProvider>
			</ThemeProvider>
		</Router>
	);
};
