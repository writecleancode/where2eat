import { HttpResponse, http } from 'msw';
import { cateringEstablishments } from 'src/data/cateringEstablishments';
import { catetingEstablishmentsType } from 'src/types/types';

let visited: string[] = JSON.parse(localStorage.getItem('visited') as string) || [];

const checkUserPreferences = (cateringEstablishments: catetingEstablishmentsType[]) => {
	// const test = cateringEstablishments.map(place => visited.includes(place.id));
	const test = cateringEstablishments.map(place => {
		return {
			...place,
			isVisited: visited.includes(place.id),
			// isFavourite: favourites.includes(place.id),
		};
	});

	// return {
	// 	...cateringEstablishments,
	// 	isVisited: true,
	// };

	return test
};

export const handlers = [
	http.get('/:category', ({ params }) => {
		switch (params.category) {
			case 'all':
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(cateringEstablishments),
				});

			case 'unvisited':
				const matchingCateringEstablishments = cateringEstablishments.filter(el => !visited.includes(el.id));
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
		localStorage.setItem('visited', JSON.stringify(visited));

		return new HttpResponse(null, { status: 200 });
	}),
];
