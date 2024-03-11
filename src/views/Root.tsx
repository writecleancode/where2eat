import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/assets/styles/theme';
import { GlobalStyle } from 'src/assets/styles/GlobalStyle';
import { CategoryProvider } from 'src/providers/CategoryProvider';
import { TypeProvider } from 'src/providers/TypeProvider';
import { MainTemplate } from 'src/components/templates/MainTemplate/MainTemplate';
import { CateringEstablishments } from './CateringEstablishments';

export const Root = () => {
	const { isNavOpen } = useContext(NavContext);

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CategoryProvider>
					<TypeProvider>
						<GlobalStyle $isNavOpen={isNavOpen} />
						<MainTemplate>
							<Routes>
								<Route path='/'>
									<Route path=':category?' element={<CateringEstablishments />}>
										<Route path=':type?' element={<CateringEstablishments />} />
									</Route>
								</Route>
								{/* <Route path='/ongoing-promotions' /> */}
							</Routes>
						</MainTemplate>
					</TypeProvider>
				</CategoryProvider>
			</ThemeProvider>
		</Router>
	);
};
