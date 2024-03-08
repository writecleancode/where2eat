import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import { NavButtonsWrapper } from 'src/components/atoms/NavButtonsWrapper/NavButtonsWrapper';
import { StyledNavLink } from 'src/components/atoms/StyledLink/StyledNavButton';
import { SeparatingLine } from './NavLinksFilters.styles';

type NavLinksFiltersProps = {
	$isDesktop?: boolean;
};

export const NavLinksFilters = ({ $isDesktop }: NavLinksFiltersProps) => {
	const { closeNav } = useContext(NavContext);

	return (
		<>
			<NavButtonsWrapper $isDesktop={$isDesktop}>
				{cateringEstabilishmentsTypes.map(({title, value, path}) => (
					<StyledNavLink to={`/${path}`} key={value} $isActive={false} $isReversed onClick={closeNav}>
						{title}
					</StyledNavLink>
				))}
			</NavButtonsWrapper>
			<SeparatingLine />
		</>
	);
};
