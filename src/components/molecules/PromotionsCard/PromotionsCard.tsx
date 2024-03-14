import { StyledPlaceName } from 'src/components/atoms/StyledPlaceName/StyledPlaceName';
import styled from 'styled-components';

export const Wrapper = styled.div`
	padding: 0.8rem;
	border: 1px solid ${({ theme }) => theme.colors.black25};
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.14);
`;

export const StyledPicture = styled.img`
	width: 100%;
	aspect-ratio: 4 / 1;
	object-fit: cover;
	object-position: center;
`;

export const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin-top: 0.8rem;
	list-style: none;
`;

export const StyledListItem = styled.li``;

export const CustomLiMarker = styled.span`
	position: relative;
	display: inline-block;
	margin-right: 0.8rem;
	width: 3px;
	height: 1em;

	&::after {
		content: '';
		position: absolute;
		top: 50%;
		translate: 0 50%;
		border-radius: 50px;
		width: 3px;
		min-height: 3px;
		background-color: ${({ theme }) => theme.colors.black};
	}
`;

type PromotionsCardProps = {
	promotionItem: {
		place: string;
		imgURL: string;
		imgAlt: string;
		promotionsList: string[];
	};
};

export const PromotionsCard = ({ promotionItem: { place, imgURL, imgAlt, promotionsList } }: PromotionsCardProps) => {
	return (
		<Wrapper>
			<StyledPlaceName>{place}</StyledPlaceName>
			<StyledPicture src={imgURL} alt={imgAlt} />
			<StyledList>
				{promotionsList.map((promotion, index) => (
					<StyledListItem key={index}>
						<CustomLiMarker />
						{promotion}
					</StyledListItem>
				))}
			</StyledList>
		</Wrapper>
	);
};
