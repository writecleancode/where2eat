import { Route, Routes } from 'react-router-dom';
import { CateringEstablishments } from 'src/views/CateringEstablishments';

export const RoutesProvider = () => {
	return (
		<Routes>
			<Route path='/'>
				<Route path=':category?' element={<CateringEstablishments />}>
					<Route path=':type?' element={<CateringEstablishments />} />
				</Route>
			</Route>
		</Routes>
	);
};