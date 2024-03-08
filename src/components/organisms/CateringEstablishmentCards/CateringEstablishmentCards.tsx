import { useContext, useEffect, useState } from 'react';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CateringEstablishmentCard } from 'src/components/molecules/CateringEstablishmentCard/CateringEstablishmentCard';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { catetingEstablishmentsType } from 'src/types/types';
import { Wrapper } from './CateringEstablishmentCards.styles';

export const CateringEstablishmentCards = () => {
	const [cateringEstablishments, setCateringEstablishments] = useState<never[] | catetingEstablishmentsType[]>([]);
	const { category } = useParams();
	const { setCategory } = useContext(CategoryContext);

	useEffect(() => {
		axios
			.get(`/${category}`)
			.then(({ data }) => setCateringEstablishments(data.matchingCateringEstablishments))
			.catch(error => console.log(error));

		category && setCategory(category);
	}, [category]);

	return (
		<Wrapper>
			{cateringEstablishments.length ? (
				cateringEstablishments.map(cateringEstablishment => (
					<CateringEstablishmentCard key={cateringEstablishment.id} cateringEstablishment={cateringEstablishment} />
				))
			) : (
				<LoadingGif />
			)}
		</Wrapper>
	);
};
