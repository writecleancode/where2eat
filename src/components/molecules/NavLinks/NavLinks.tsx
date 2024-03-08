import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { navCategories } from 'src/data/navCategories';
import { NavButtonsWrapper } from 'src/components/atoms/NavButtonsWrapper/NavButtonsWrapper';
import { StyledNavLink } from 'src/components/atoms/StyledLink/StyledNavButton';
import { HorizontalLine } from 'src/components/atoms/HorizontalLine/HorizontalLine';
import { CategoryContext } from 'src/providers/CategoryProvider';

export const NavLinks = () => {
	const { closeNav } = useContext(NavContext);
	const { currentCategory } = useContext(CategoryContext);

	return (
		<NavButtonsWrapper>
			{navCategories.map(({ title, value, path }) => (
				<StyledNavLink to={`/${path}`} key={value} onClick={closeNav} $isActive={currentCategory === path}>
					{title}
				</StyledNavLink>
			))}
			<HorizontalLine $isShort />
			<StyledNavLink to={`/ongoing-promotions`} $isActive={currentCategory === 'ongoing-promotions'} onClick={closeNav}>
				Ongoing Promotions
			</StyledNavLink>
		</NavButtonsWrapper>
	);
};
