import { HttpResponse, http } from 'msw';
import { cateringEstablishments } from 'src/data/cateringEstablishments';

export const handlers = [
	http.get('/all', () => {
		return HttpResponse.json({
			cateringEstablishments,
		});
	}),
];
