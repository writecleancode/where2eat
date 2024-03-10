import { HttpResponse, http } from 'msw';
import { cateringEstablishments } from 'src/data/cateringEstablishments';
import { catetingEstablishmentsType } from 'src/types/types';

let visited: string[] = JSON.parse(localStorage.getItem('visited') as string) || [];
let favourites: string[] = JSON.parse(localStorage.getItem('visited') as string) || [];

const checkUserPreferences = (cateringEstablishments: catetingEstablishmentsType[]) => {
	const matchingPlaces = cateringEstablishments.map(place => {
		return {
			...place,
			isVisited: visited.includes(place.id),
			isFavourite: favourites.includes(place.id),
		};
	});

	return matchingPlaces;
};

export const handlers = [
	http.get('/:category', ({ params }) => {
		switch (params.category) {
			case 'all':
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(cateringEstablishments),
				});

			case 'unvisited':
				const unvisitedCateringEstablishments = cateringEstablishments.filter(place => !visited.includes(place.id));
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(unvisitedCateringEstablishments),
				});

			case 'favourites':
				const favouriteCateringEstablishments = cateringEstablishments.filter(place => favourites.includes(place.id));
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(favouriteCateringEstablishments),
				});

			case 'highly-rated':
				const highlyRatedCateringEstablishments = cateringEstablishments.filter(place => Number(place.ratings) >= 4.8);
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(highlyRatedCateringEstablishments),
				});

			case 'currenly-open':
				return HttpResponse.json({
					matchingCateringEstablishments: cateringEstablishments,
				});

			default:
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(cateringEstablishments),
				});
		}
	}),

	http.post('/visited', async ({ request }) => {
		const { clickedId } = (await request.json()) as Record<string, string>;

		visited.includes(clickedId) ? (visited = visited.filter(id => id !== clickedId)) : visited.push(clickedId);
		localStorage.setItem('visited', JSON.stringify(visited));

		return new HttpResponse(null, { status: 200 });
	}),

	http.post('/favourites', async ({ request }) => {
		const { clickedId } = (await request.json()) as Record<string, string>;

		favourites.includes(clickedId)
			? (favourites = favourites.filter(id => id !== clickedId))
			: favourites.push(clickedId);
		localStorage.setItem('favourites', JSON.stringify(favourites));

		return new HttpResponse(null, { status: 200 });
	}),
];
