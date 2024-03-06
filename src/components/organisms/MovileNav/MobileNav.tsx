import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import { StyledNavButton } from 'src/components/atoms/StyledLink/StyledNavButton';
import styled from 'styled-components';

export const Wrapper = styled.div<{ $isActive: boolean }>`
	/* ${({ $isActive }) => ($isActive ? 'display: block;' : 'display: none;')} */
	position: absolute;
	z-index: 999;
	padding: 1.6rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.black25};
	width: 100%;
	background-color: #f2f2f2;
	background-color: #fff;
	box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.3);
	clip-path: ${({ $isActive }) =>
		$isActive ? 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0 0, 100% 0%, 100% 0%, 0 0%)'};
	pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
	transition: clip-path 0.4s;
`;

export const NavButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

export const HorizontalLine = styled.span<{ $isShort?: boolean }>`
	display: block;
	margin-top: 2.4rem;
	margin-bottom: 0.8rem;
	${({ $isShort }) => ($isShort ? 'max-width: 70%;' : '')}
	min-height: 1px;
	background-color: ${({ theme }) => theme.colors.black50};
`;

type MobileNavProps = {
	isNavOpen: boolean;
};

export const MobileNav = ({ isNavOpen }: MobileNavProps) => {
	return (
		<Wrapper $isActive={isNavOpen}>
			<NavButtonsWrapper>
				{cateringEstabilishmentsTypes.map(type => (
					<StyledNavButton key={type.value} $isActive={false} $isReversed>
						{type.title}
					</StyledNavButton>
				))}
			</NavButtonsWrapper>
			<HorizontalLine />
			<NavButtonsWrapper>
				<StyledNavButton $isActive={true}>All</StyledNavButton>
				<StyledNavButton $isActive={false}>Unvisited</StyledNavButton>
				<StyledNavButton $isActive={false}>Favourites</StyledNavButton>
				<StyledNavButton $isActive={false}>Highly Rated</StyledNavButton>
				<StyledNavButton $isActive={false}>Currently Open</StyledNavButton>
			</NavButtonsWrapper>
			<HorizontalLine $isShort />
			<StyledNavButton $isActive={false}>Ongoing Promotions</StyledNavButton>
		</Wrapper>
	);
};
