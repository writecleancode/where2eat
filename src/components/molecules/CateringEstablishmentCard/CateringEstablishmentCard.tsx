import { IconButton } from 'src/components/atoms/IconButton/IconButton';
import { basePath } from 'src/utils/base-path';
import { IconsWrapper, Info, InfoDescription, InfoRow, InfoWrapper, Picture, Title, Wrapper } from './CateringEstablishmentCard.styles';
import { CateringEstablishmentCardProps } from 'src/types/types';

const currentDay = new Date().getDay();

export const CateringEstablishmentCard = ({
	index,
	handleOpenModal,
	handleVisitedStatus,
	handleFavouritesStatus,
	cateringEstablishment: { id, type, name, imgURL, imgAlt, adress, distance, ratings, prices, openHours, isVisited, isFavourite },
}: CateringEstablishmentCardProps) => {
	return (
		<Wrapper>
			<Title>{name}</Title>
			<Picture src={`${basePath}/${imgURL}`} alt={imgAlt} />
			<InfoWrapper>
				<InfoRow>
					<Info>{distance} km</Info>
					<InfoDescription>{adress}</InfoDescription>
				</InfoRow>
				<InfoRow>
					<Info>{type}</Info>
					<InfoDescription>Type</InfoDescription>
				</InfoRow>
				<InfoRow>
					<Info>{ratings} / 5</Info>
					<InfoDescription>Ratings</InfoDescription>
				</InfoRow>
				<InfoRow>
					<Info>{prices}</Info>
					<InfoDescription>Prices</InfoDescription>
				</InfoRow>
				<InfoRow>
					<Info>{`${openHours[currentDay].openingAt} - ${openHours[currentDay].closingAt}`}</Info>
					<InfoDescription>Today</InfoDescription>
				</InfoRow>
			</InfoWrapper>
			<IconsWrapper>
				<IconButton iconURL={`${basePath}/icons/info.svg`} label='Show more details' onClick={() => handleOpenModal(id)} />
				<IconButton
					iconURL={`${basePath}/icons/check.svg`}
					iconTwoURL={`${basePath}/icons/check-fill.svg`}
					label='Mark as visited'
					isActive={isVisited}
					onClick={() => handleVisitedStatus(index, id)}
				/>
				<IconButton
					iconURL={`${basePath}/icons/heart.svg`}
					iconTwoURL={`${basePath}/icons/heart-fill.svg`}
					label='Add to favourites'
					isActive={isFavourite}
					onClick={() => handleFavouritesStatus(index, id)}
				/>
			</IconsWrapper>
		</Wrapper>
	);
};
