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
import { CateringEstablishmentCardProps } from 'src/types/types';

const currentDay = new Date().getDay();

export const CateringEstablishmentCard = ({
	index,
	handleOpenModal,
	markAsVisited,
	addToFavourites,
	cateringEstablishment: {
		id,
		type,
		name,
		imgURL,
		imgAlt,
		adress,
		distance,
		ratings,
		prices,
		openHours,
		isVisited,
		isFavourite,
	},
}: CateringEstablishmentCardProps) => {
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
					<Info>{`${openHours[currentDay].openingAt} - ${openHours[currentDay].closingAt}`}</Info>
					<InfoDesciption>Today</InfoDesciption>
				</InfoRow>
			</InfoWrapper>
			<IconsWrapper>
				<IconButton
					iconURL='/src/assets/icons/info.svg'
					label='Show more details'
					onClick={() => handleOpenModal(id)}
				/>
				<IconButton
					iconURL='/src/assets/icons/check.svg'
					iconTwoURL='/src/assets/icons/check-fill.svg'
					label='Mark as visited'
					isActive={isVisited}
					onClick={() => markAsVisited(index, id)}
				/>
				<IconButton
					iconURL='/src/assets/icons/heart.svg'
					iconTwoURL='/src/assets/icons/heart-fill.svg'
					label='Add to favorites'
					isActive={isFavourite}
					onClick={() => addToFavourites(index, id)}
				/>
			</IconsWrapper>
		</Wrapper>
	);
};
