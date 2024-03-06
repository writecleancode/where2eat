import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import { StyledNavButton } from 'src/components/atoms/StyledLink/StyledNavButton';
import { HorizontalLine, NavButtonsWrapper, Wrapper } from './MobileNav.styles';

type MobileNavProps = {
	isNavOpen: boolean;
	closeNav: () => void;
};

export const MobileNav = ({ isNavOpen, closeNav }: MobileNavProps) => {
	return (
		<Wrapper $isActive={isNavOpen}>
			<NavButtonsWrapper>
				{cateringEstabilishmentsTypes.map(type => (
					<StyledNavButton key={type.value} $isActive={false} $isReversed onClick={closeNav}>
						{type.title}
					</StyledNavButton>
				))}
			</NavButtonsWrapper>
			<HorizontalLine />
			<NavButtonsWrapper>
				<StyledNavButton onClick={closeNav} $isActive={true}>
					All
				</StyledNavButton>
				<StyledNavButton onClick={closeNav} $isActive={false}>
					Unvisited
				</StyledNavButton>
				<StyledNavButton onClick={closeNav} $isActive={false}>
					Favourites
				</StyledNavButton>
				<StyledNavButton onClick={closeNav} $isActive={false}>
					Highly Rated
				</StyledNavButton>
				<StyledNavButton onClick={closeNav} $isActive={false}>
					Currently Open
				</StyledNavButton>
			</NavButtonsWrapper>
			<HorizontalLine $isShort />
			<StyledNavButton $isActive={false} onClick={closeNav}>
				Ongoing Promotions
			</StyledNavButton>

			<StyledNavButton $isActive={false} onClick={closeNav}>
				Ongoing Promotions
			</StyledNavButton>
            
		</Wrapper>
	);
};
