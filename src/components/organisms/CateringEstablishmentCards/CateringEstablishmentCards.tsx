import { useContext, useEffect, useState } from 'react';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CateringEstablishmentCard } from 'src/components/molecules/CateringEstablishmentCard/CateringEstablishmentCard';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { catetingEstablishmentsType } from 'src/types/types';
import { Wrapper } from './CateringEstablishmentCards.styles';
import { navCategories } from 'src/data/navCategories';

export const CateringEstablishmentCards = () => {
	const [cateringEstablishments, setCateringEstablishments] = useState<never[] | catetingEstablishmentsType[]>([]);
	const { category } = useParams();
	const { setCategory } = useContext(CategoryContext);

	const getCateringEstablishments = () => {
		axios
			.get(`/${category}`)
			.then(({ data }) => setCateringEstablishments(data.matchingCateringEstablishments))
			.catch(error => console.log(error));
	};

	const markAsVisited = (index: number, id: string) => {
		setCateringEstablishments([
			...cateringEstablishments.slice(0, index),
			{ ...cateringEstablishments[index], isVisited: !cateringEstablishments[index].isVisited },
			...cateringEstablishments.slice(index + 1),
		]);

		axios
			.post('/visited', { clickedId: id })
			.then(() => {
				if (category === 'unvisited') {
					getCateringEstablishments();
				}
			})
			.catch(error => console.log(error));
	};

	const addToFavourites = (index: number, id: string) => {
		setCateringEstablishments([
			...cateringEstablishments.slice(0, index),
			{ ...cateringEstablishments[index], isFavourite: !cateringEstablishments[index].isFavourite },
			...cateringEstablishments.slice(index + 1),
		]);

		axios
			.post('/favourites', { clickedId: id })
			.then(() => {
				if (category === 'favourites') {
					getCateringEstablishments();
				}
			})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		getCateringEstablishments();

		category && setCategory(category);
	}, [category]);

	if (!category) return <Navigate to={`/${navCategories[0].path}`} />;

	return (
		<Wrapper>
			{cateringEstablishments.length ? (
				cateringEstablishments.map((cateringEstablishment, index) => (
					<CateringEstablishmentCard
						key={cateringEstablishment.id}
						cateringEstablishment={cateringEstablishment}
						index={index}
						markAsVisited={markAsVisited}
						addToFavourites={addToFavourites}
					/>
				))
			) : (
				<LoadingGif />
			)}
		</Wrapper>
	);
};
