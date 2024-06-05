import { StyledPlaceName } from 'src/components/atoms/StyledPlaceName/StyledPlaceName';
import { basePath } from 'src/utils/base-path';
import {
	CloseButton,
	ContactWrapper,
	DayOfWeek,
	ListAndImgWrapper,
	StyledList,
	StyledListItem,
	StyledPicture,
	Wrapper,
} from './CateringEstablishmentDetails.styles';
import { CateringEstablishmentDetailsProps } from 'src/types/types';

export const CateringEstablishmentDetails = ({
	handleCloseModal,
	cateringEstablishment: { name, imgURL, imgAlt, openHours, adressLong, phoneNumber },
}: CateringEstablishmentDetailsProps) => {
	return (
		<Wrapper>
			<StyledPlaceName>{name}</StyledPlaceName>
			<ListAndImgWrapper>
				<StyledPicture src={`${basePath}/${imgURL}`} alt={imgAlt} />
				<StyledList>
					{openHours.map(({ openingAt, closingAt, dayOfWeek }) => (
						<StyledListItem key={dayOfWeek}>
							<p>
								{openingAt} - {closingAt}
							</p>
							<DayOfWeek>{dayOfWeek}</DayOfWeek>
						</StyledListItem>
					))}
				</StyledList>
			</ListAndImgWrapper>
			<ContactWrapper>
				<p>{adressLong}</p>
				<p>{phoneNumber}</p>
			</ContactWrapper>
			<CloseButton onClick={handleCloseModal} aria-label='close modal' type='button'>
				<img src={`${basePath}/icons/x-mark.svg`} alt='' />
			</CloseButton>
		</Wrapper>
	);
};
