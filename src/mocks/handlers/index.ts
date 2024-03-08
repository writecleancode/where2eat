import { HttpResponse, http } from 'msw';
import { cateringEstablishments } from 'src/data/cateringEstablishments';

let visited: string[] = [];

export const handlers = [
	http.get('/:category', ({ params }) => {
		switch (params.category) {
			case 'all':
				return HttpResponse.json({
					matchingCateringEstablishments: cateringEstablishments,
				});

			case 'unvisited':
				const matchingCateringEstablishments = cateringEstablishments.filter(el => visited.includes(el.id));
				return HttpResponse.json({
					matchingCateringEstablishments: matchingCateringEstablishments,
				});

			case 'favourites':
				return HttpResponse.json({
					matchingCateringEstablishments: cateringEstablishments,
				});

			case 'highly-rated':
				return HttpResponse.json({
					matchingCateringEstablishments: cateringEstablishments,
				});

			case 'currenly-open':
				return HttpResponse.json({
					matchingCateringEstablishments: cateringEstablishments,
				});

			default:
				return HttpResponse.json({
					matchingCateringEstablishments: cateringEstablishments,
				});
		}
	}),

	http.post('/visited', async ({ request }) => {
		const { clickedId } = (await request.json()) as Record<string, string>;

		visited.includes(clickedId) ? (visited = visited.filter(id => id !== clickedId)) : visited.push(clickedId);

		return new HttpResponse(null, { status: 200 });
	}),
];
