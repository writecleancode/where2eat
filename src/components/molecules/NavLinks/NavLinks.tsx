import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { NavButtonsWrapper } from 'src/components/atoms/NavButtonsWrapper/NavButtonsWrapper';
import { StyledNavButton } from 'src/components/atoms/StyledLink/StyledNavButton';
import { HorizontalLine } from 'src/components/atoms/HorizontalLine/HorizontalLine';

export const NavLinks = () => {
	const { closeNav } = useContext(NavContext);

	return (
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
	);
};
