import { StyledPlaceName } from 'src/components/atoms/StyledPlaceName/StyledPlaceName';
import { CustomLiMarker, StyledList, StyledPicture, Wrapper } from './PromotionsCard.styles';
import { PromotionsCardProps } from 'src/types/types';

export const PromotionsCard = ({ promotionItem: { placeName, image, promotionsList } }: PromotionsCardProps) => {
	return (
		<Wrapper>
			<StyledPlaceName>{placeName}</StyledPlaceName>
			<StyledPicture src={image.url} alt={image.alt} />
			<StyledList>
				{promotionsList.map((promotion, index) => (
					<li key={index}>
						<CustomLiMarker />
						{promotion}
					</li>
				))}
			</StyledList>
		</Wrapper>
	);
};
