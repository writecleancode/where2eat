import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import { NavButtonsWrapper } from 'src/components/atoms/NavButtonsWrapper/NavButtonsWrapper';
import { StyledNavLink } from 'src/components/atoms/StyledLink/StyledNavButton';
import { SeparatingLine } from './NavLinksFilters.styles';

type NavLinksFiltersProps = {
	$isDesktop?: boolean;
};

export const NavLinksFilters = ({ $isDesktop }: NavLinksFiltersProps) => {
	const { closeNav } = useContext(NavContext);
	const { currentCategory } = useContext(CategoryContext);
	const { currentType } = useContext(TypeContext);

	return (
		<>
			<NavButtonsWrapper $isDesktop={$isDesktop}>
				{cateringEstabilishmentsTypes.map(({ title, value, path }) => (
					<StyledNavLink
						to={`/${currentCategory}/${path}`}
						key={value}
						$isActive={currentType === path}
						$isReversed
						onClick={closeNav}>
						{title}
					</StyledNavLink>
				))}
			</NavButtonsWrapper>
			<SeparatingLine />
		</>
	);
};
