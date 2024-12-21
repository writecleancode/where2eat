import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { navCategories } from 'src/data/navCategories';
import { NavButtonsWrapper } from 'src/components/atoms/NavButtonsWrapper/NavButtonsWrapper';
import { StyledNavLink } from 'src/components/atoms/StyledNavLink/StyledNavLink';
import { HorizontalLine } from 'src/components/atoms/HorizontalLine/HorizontalLine';
import { basePath } from 'src/utils/base-path';

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
				<StyledNavLink to={`${basePath}/${path}/${currentType}`} key={value} onClick={closeNav} $isActive={currentCategory === path}>
					{title}
				</StyledNavLink>
			))}
			<HorizontalLine $isShort />
			<StyledNavLink
				to={`${basePath}/ongoing-promotions`}
				$isActive={currentCategory === 'ongoing-promotions'}
				onClick={handleOgnoingPromotions}>
				Ongoing Promotions
			</StyledNavLink>
		</NavButtonsWrapper>
	);
};
