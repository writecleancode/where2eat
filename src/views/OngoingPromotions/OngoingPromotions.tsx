import { useContext, useEffect } from 'react';
import { usePromotions } from 'src/hooks/usePromotions';
import { useLoading } from 'src/hooks/useLoading';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { PromotionsCard } from 'src/components/molecules/PromotionsCard/PromotionsCard';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { NoResultsText } from 'src/components/atoms/NoResultsText/NoResultsText';
import { Wrapper } from './OngoingPromotions.styles';

export const OngoingPromotions = () => {
	const { promotions, getPromotionsData } = usePromotions();
	const { isLoading, setLoadingCompleted } = useLoading();
	const { setCategory } = useContext(CategoryContext);

	useEffect(() => {
		(async () => {
			await getPromotionsData();
			setLoadingCompleted();
		})();
		setCategory('ongoing-promotions');
	}, []);

	return (
		<Wrapper>
			{promotions.length ? (
				promotions.map((promotionItem, index) => <PromotionsCard key={index} promotionItem={promotionItem} />)
			) : isLoading ? (
				<LoadingGif />
			) : (
				<NoResultsText>There are no available promotions right now.</NoResultsText>
			)}
		</Wrapper>
	);
};
