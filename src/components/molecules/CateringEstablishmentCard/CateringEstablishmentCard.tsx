import axios from 'axios';
import { IconButton } from 'src/components/atoms/IconButton/IconButton';
import {
	IconsWrapper,
	Info,
	InfoDesciption,
	InfoRow,
	InfoWrapper,
	Picture,
	Title,
	Wrapper,
} from './CateringEstablishmentCard.styles';
import { catetingEstablishmentsType } from 'src/types/types';

type CateringEstablishmentCardProps = {
	cateringEstablishment: catetingEstablishmentsType;
};

export const CateringEstablishmentCard = ({
	cateringEstablishment: { id, type, name, imgURL, imgAlt, adress, distance, ratings, prices },
}: CateringEstablishmentCardProps) => {
	const markAsVisited = (id: string) => {
		axios
			.post('/visited', { clickedId: id })
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	return (
		<Wrapper>
			<Title>{name}</Title>
			<Picture src={imgURL} alt={imgAlt} />
			<InfoWrapper>
				<InfoRow>
					<Info>{distance}</Info>
					<InfoDesciption>{adress}</InfoDesciption>
				</InfoRow>
				<InfoRow>
					<Info>{type}</Info>
					<InfoDesciption>Type</InfoDesciption>
				</InfoRow>
				<InfoRow>
					<Info>{ratings} / 5</Info>
					<InfoDesciption>Ratings</InfoDesciption>
				</InfoRow>
				<InfoRow>
					<Info>{prices}</Info>
					<InfoDesciption>Prices</InfoDesciption>
				</InfoRow>
				<InfoRow>
					<Info>16:00 - 22:00</Info>
					<InfoDesciption>Today</InfoDesciption>
				</InfoRow>
			</InfoWrapper>
			<IconsWrapper>
				<IconButton iconURL='/src/assets/icons/info.svg' label='Show more details' />
				<IconButton
					iconURL='/src/assets/icons/check.svg'
					iconTwoURL='/src/assets/icons/check-fill.svg'
					label='Mark as visited'
					onClick={() => markAsVisited(id)}
				/>
				<IconButton
					iconURL='/src/assets/icons/heart.svg'
					iconTwoURL='/src/assets/icons/heart-fill.svg'
					label='Add to favorites'
				/>
			</IconsWrapper>
		</Wrapper>
	);
};
