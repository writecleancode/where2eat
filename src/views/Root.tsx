import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProviders } from 'src/providers/AppProviders';
import { MainTemplate } from 'src/components/templates/MainTemplate/MainTemplate';
import { CateringEstablishments } from './CateringEstablishments';
import { OngoingPromotions } from './OngoingPromotions';

export const Root = () => {
	return (
		<Router>
			<AppProviders>
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
			</AppProviders>
		</Router>
	);
};
