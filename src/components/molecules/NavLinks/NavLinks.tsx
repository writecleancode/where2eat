import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { navCategories } from 'src/data/navCategories';
import { NavButtonsWrapper } from 'src/components/atoms/NavButtonsWrapper/NavButtonsWrapper';
import { StyledNavLink } from 'src/components/atoms/StyledLink/StyledNavButton';
import { HorizontalLine } from 'src/components/atoms/HorizontalLine/HorizontalLine';

export const NavLinks = () => {
	const { closeNav } = useContext(NavContext);
	const { currentCategory } = useContext(CategoryContext);
	const { currentType, setType } = useContext(TypeContext);

	const handleOgnoingPromotions = () => {
		closeNav();
		setType('');
	};

	return (
		<NavButtonsWrapper>
			{navCategories.map(({ title, value, path }) => (
				<StyledNavLink
					to={`/${path}/${currentType}`}
					key={value}
					onClick={closeNav}
					$isActive={currentCategory === path}>
					{title}
				</StyledNavLink>
			))}
			<HorizontalLine $isShort />
			<StyledNavLink
				to={`/ongoing-promotions`}
				$isActive={currentCategory === 'ongoing-promotions'}
				onClick={handleOgnoingPromotions}>
				Ongoing Promotions
			</StyledNavLink>
		</NavButtonsWrapper>
	);
};
