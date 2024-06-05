import { Route, Routes } from 'react-router-dom';
import { AppProviders } from 'src/providers/AppProviders';
import { MainTemplate } from 'src/components/templates/MainTemplate/MainTemplate';
import { CateringEstablishments } from './CateringEstablishments';
import { OngoingPromotions } from './OngoingPromotions';
import { basePath } from 'src/utils/base-path';

export const Root = () => {
	return (
		<AppProviders>
			<MainTemplate>
				<Routes>
					<Route path={`${basePath}/`}>
						<Route path=':category?' element={<CateringEstablishments />}>
							<Route path=':type?' element={<CateringEstablishments />} />
						</Route>
					</Route>
					<Route path={`${basePath}/ongoing-promotions`} element={<OngoingPromotions />} />
				</Routes>
			</MainTemplate>
		</AppProviders>
	);
};
