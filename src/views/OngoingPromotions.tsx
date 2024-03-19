import { useContext, useEffect } from 'react';
import { usePromotions } from 'src/hooks/usePromotions';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { PromotionsCard } from 'src/components/molecules/PromotionsCard/PromotionsCard';
import { NoResultsText } from 'src/components/atoms/NoResultsText/NoResultsText';
import { Wrapper } from './OngoingPromotions.styles';

export const OngoingPromotions = () => {
	const { promotions, getPromotionsData } = usePromotions();
	const { setCategory } = useContext(CategoryContext);

	useEffect(() => {
		getPromotionsData();
		setCategory('ongoing-promotions');
	}, []);

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
