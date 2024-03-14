import { StyledPlaceName } from 'src/components/atoms/StyledPlaceName/StyledPlaceName';
import { CustomLiMarker, StyledList, StyledPicture, Wrapper } from './PromotionsCard.styles';
import { PromotionsCardProps } from 'src/types/types';

export const PromotionsCard = ({ promotionItem: { place, imgURL, imgAlt, promotionsList } }: PromotionsCardProps) => {
	return (
		<Wrapper>
			<StyledPlaceName>{place}</StyledPlaceName>
			<StyledPicture src={imgURL} alt={imgAlt} />
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
