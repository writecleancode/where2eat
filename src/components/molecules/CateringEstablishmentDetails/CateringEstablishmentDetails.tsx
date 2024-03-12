import { StyledPlaceName } from 'src/components/atoms/StyledPlaceName/StyledPlaceName';
import { CateringEstablishmentDetailsProps } from 'src/types/types';
import {
	CloseButton,
	ContactWrapper,
	ListAndImgWrapper,
	StyledList,
	StyledListItem,
	StyledPicture,
	Wrapper,
} from './CateringEstablishmentDetails.styles';

export const CateringEstablishmentDetails = ({
	handleCloseModal,
	cateringEstablishment: { name, imgURL, imgAlt, openHours, adressLong, phoneNumber },
}: CateringEstablishmentDetailsProps) => {
	return (
		<Wrapper>
			<StyledPlaceName>{name}</StyledPlaceName>
			<ListAndImgWrapper>
				<StyledPicture src={imgURL} alt={imgAlt} />
				<StyledList>
					{openHours.map(({ openingAt, closingAt, dayOfWeek }) => (
						<StyledListItem key={dayOfWeek}>
							<p>
								{openingAt} - {closingAt}
							</p>
							<p>{dayOfWeek}</p>
						</StyledListItem>
					))}
				</StyledList>
			</ListAndImgWrapper>
			<ContactWrapper>
				<p>{adressLong}</p>
				<p>{phoneNumber}</p>
			</ContactWrapper>
			<CloseButton onClick={handleCloseModal} aria-label='close modal' type='button'>
				<img src='/src/assets/icons/x-mark.svg' alt='' />
			</CloseButton>
		</Wrapper>
	);
};
