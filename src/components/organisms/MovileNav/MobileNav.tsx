import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import { StyledNavButton } from 'src/components/atoms/StyledLink/StyledNavButton';
import { SeparatingLine, NavButtonsWrapper, Wrapper, HorizontalLine } from './MobileNav.styles';

export const MobileNav = () => {
	const { isNavOpen, closeNav } = useContext(NavContext);

	return (
		<Wrapper $isActive={isNavOpen}>
			<NavButtonsWrapper>
				{cateringEstabilishmentsTypes.map(type => (
					<StyledNavButton key={type.value} $isActive={false} $isReversed onClick={closeNav}>
						{type.title}
					</StyledNavButton>
				))}
			</NavButtonsWrapper>
			<SeparatingLine />
			<div>
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
					<HorizontalLine $isShort />
					<StyledNavButton $isActive={false} onClick={closeNav}>
						Ongoing Promotions
					</StyledNavButton>
				</NavButtonsWrapper>
			</div>
		</Wrapper>
	);
};
