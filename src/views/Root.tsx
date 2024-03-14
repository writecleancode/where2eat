import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/assets/styles/theme';
import { GlobalStyle } from 'src/assets/styles/GlobalStyle';
import { NavProvider } from 'src/providers/NavProvider';
import { CategoryProvider } from 'src/providers/CategoryProvider';
import { TypeProvider } from 'src/providers/TypeProvider';
import { CateringEstablishmentsProvider } from 'src/providers/CateringEstablishmentsProvider';
import { MainTemplate } from 'src/components/templates/MainTemplate/MainTemplate';
import { CateringEstablishments } from './CateringEstablishments';
import { OngoingPromotions } from './OngoingPromotions';

export const Root = () => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<NavProvider>
					<CategoryProvider>
						<TypeProvider>
							<CateringEstablishmentsProvider>
								<GlobalStyle />
								<MainTemplate>
									<Routes>
										<Route path='/'>
											<Route path=':category?' element={<CateringEstablishments />}>
												<Route path=':type?' element={<CateringEstablishments />} />
											</Route>
										</Route>
										<Route path='/ongoing-promotions' element={<OngoingPromotions />} />
									</Routes>
								</MainTemplate>
							</CateringEstablishmentsProvider>
						</TypeProvider>
					</CategoryProvider>
				</NavProvider>
			</ThemeProvider>
		</Router>
	);
};
