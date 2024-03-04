import { IconButton } from 'src/components/atoms/IconButton/IconButton';
import {
	IconsWrapper,
	Info,
	InfoDesciption,
	InfoWrapper,
	Picture,
	Title,
	Wrapper,
} from './CateringEstablishmentCard.styles';

type CateringEstablishmentCardProps = {
	cateringEstablishment: {
		id: string;
		type: string;
		name: string;
		imgURL: string;
		imgAlt: string;
		adress: string;
		adressLong: string;
		distance: string;
		ratings: string;
		prices: string;
		phoneNumber: string;
		openHours: {
			monday: string;
			tuesday: string;
			wednesday: string;
			thursday: string;
			friday: string;
			suturday: string;
			saunday: string;
		};
	};
};

export const CateringEstablishmentCard = ({
	cateringEstablishment: { type, name, imgURL, imgAlt, adress, distance, ratings, prices },
}: CateringEstablishmentCardProps) => {
	return (
		<Wrapper>
			<Title>{name}</Title>
			<Picture src={imgURL} alt={imgAlt} />
			<div>
				<InfoWrapper>
					<Info>{distance}</Info>
					<InfoDesciption>{adress}</InfoDesciption>
				</InfoWrapper>
				<InfoWrapper>
					<Info>{type}</Info>
					<InfoDesciption>Type</InfoDesciption>
				</InfoWrapper>
				<InfoWrapper>
					<Info>{ratings} / 5</Info>
					<InfoDesciption>Ratings</InfoDesciption>
				</InfoWrapper>
				<InfoWrapper>
					<Info>{prices}</Info>
					<InfoDesciption>Prices</InfoDesciption>
				</InfoWrapper>
				<InfoWrapper>
					<Info>16:00 - 22:00</Info>
					<InfoDesciption>Today</InfoDesciption>
				</InfoWrapper>
			</div>
			<IconsWrapper>
				<IconButton iconURL='/src/assets/icons/info.svg' label='Show more details' />
				<IconButton
					iconURL='/src/assets/icons/check.svg'
					iconTwoURL='/src/assets/icons/check-fill.svg'
					label='Mark as visited'
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
