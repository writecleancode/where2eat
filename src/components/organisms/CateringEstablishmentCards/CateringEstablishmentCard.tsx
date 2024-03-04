import { cateringEstablishments } from 'src/data/cateringEstablishments';
import { CateringEstablishmentCard } from 'src/components/molecules/CateringEstablishmentCard/CateringEstablishmentCard';
import { Wrapper } from './CateringEstablishmentCard.styles';

export const CateringEstablishmentCards = () => {
	return (
		<Wrapper>
			{cateringEstablishments.map(cateringEstablishment => (
				<CateringEstablishmentCard key={cateringEstablishment.id} cateringEstablishment={cateringEstablishment} />
			))}
		</Wrapper>
	);
};
