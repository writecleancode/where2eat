import { useEffect, useState } from 'react';
import axios from 'axios';
import { CateringEstablishmentCard } from 'src/components/molecules/CateringEstablishmentCard/CateringEstablishmentCard';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { catetingEstablishmentsType } from 'src/types/types';
import { Wrapper } from './CateringEstablishmentCards.styles';

export const CateringEstablishmentCards = () => {
	const [cateringEstablishments, setCateringEstablishments] = useState<never[] | catetingEstablishmentsType>([]);

	useEffect(() => {
		axios
			.get('/all')
			.then(({ data }) => setCateringEstablishments(data.cateringEstablishments))
			.catch(error => console.log(error));
	}, []);

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
