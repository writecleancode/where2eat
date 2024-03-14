import { promotions } from 'src/data/promotions';
import { PromotionsCard } from 'src/components/molecules/PromotionsCard/PromotionsCard';
import { NoResultsText } from 'src/components/atoms/NoResultsText/NoResultsText';
import { Wrapper } from './OngoingPromotions.styles';

export const OngoingPromotions = () => {
	return (
		<Wrapper>
			{promotions.length ? (
				promotions.map((promotionItem, index) => <PromotionsCard key={index} promotionItem={promotionItem} />)
			) : (
				<NoResultsText>There are no available promotions right now.</NoResultsText>
			)}
		</Wrapper>
	);
};
