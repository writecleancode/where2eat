import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
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
			<Provider store={store}>
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
			</Provider>
		</Router>
	);
};
