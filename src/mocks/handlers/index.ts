import { HttpResponse, http } from 'msw';
import { cateringEstablishments } from 'src/data/cateringEstablishments';
import { catetingEstablishmentsType } from 'src/types/types';

let visited: string[] = JSON.parse(localStorage.getItem('visited') as string) || [];
let favourites: string[] = JSON.parse(localStorage.getItem('favourites') as string) || [];

const checkUserPreferences = (cateringEstablishments: catetingEstablishmentsType[], type = 'any') => {
	const matchingPlaces = cateringEstablishments.map(place => {
		return {
			...place,
			isVisited: visited.includes(place.id),
			isFavourite: favourites.includes(place.id),
		};
	});

	if ((type && type === 'any') || type == 'undefined') return matchingPlaces;

	const filteredPlaces = matchingPlaces.filter(place => place.typeName === type);
	return filteredPlaces;
};

export const handlers = [
	http.get('/:category/:type', ({ params }) => {
		switch (params.category) {
			case 'all':
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(
						cateringEstablishments,
						params.type as string | undefined
					),
				});

			case 'unvisited':
				const unvisitedCateringEstablishments = cateringEstablishments.filter(place => !visited.includes(place.id));
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(
						unvisitedCateringEstablishments,
						params.type as string | undefined
					),
				});

			case 'favourites':
				const favouriteCateringEstablishments = cateringEstablishments.filter(place => favourites.includes(place.id));
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(
						favouriteCateringEstablishments,
						params.type as string | undefined
					),
				});

			case 'highly-rated':
				const highlyRatedCateringEstablishments = cateringEstablishments.filter(place => Number(place.ratings) >= 4.8);
				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(
						highlyRatedCateringEstablishments,
						params.type as string | undefined
					),
				});

			case 'currently-open':
				const currentDay = new Date().getDay();
				const currentTime = new Date().toLocaleTimeString('pl-PL').slice(0, -3);

				const currentlyOpenCateringEstablishments = cateringEstablishments.filter(place => {
					if (place.openHours[currentDay].closingAt > place.openHours[currentDay].openingAt) {
						return (
							currentTime >= place.openHours[currentDay].openingAt &&
							currentTime < place.openHours[currentDay].closingAt
						);
					} else if (place.openHours[currentDay].closingAt < place.openHours[currentDay].openingAt) {
						return (
							currentTime >= place.openHours[currentDay].openingAt ||
							currentTime < place.openHours[currentDay].closingAt
						);
					} else if (place.openHours[currentDay].closingAt === place.openHours[currentDay].openingAt) {
						return true;
					} else {
						return false;
					}
				});

				return HttpResponse.json({
					matchingCateringEstablishments: checkUserPreferences(
						currentlyOpenCateringEstablishments,
						params.type as string | undefined
					),
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
