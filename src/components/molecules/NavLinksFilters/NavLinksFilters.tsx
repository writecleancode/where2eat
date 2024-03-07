import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import { NavButtonsWrapper } from 'src/components/atoms/NavButtonsWrapper/NavButtonsWrapper';
import { StyledNavButton } from 'src/components/atoms/StyledLink/StyledNavButton';
import { SeparatingLine } from './NavLinksFilters.styles';

type NavLinksFiltersProps = {
	$isDesktop?: boolean;
};

export const NavLinksFilters = ({ $isDesktop }: NavLinksFiltersProps) => {
	const { closeNav } = useContext(NavContext);

	return (
		<>
			<NavButtonsWrapper $isDesktop={$isDesktop}>
				{cateringEstabilishmentsTypes.map(type => (
					<StyledNavButton key={type.value} $isActive={false} $isReversed onClick={closeNav}>
						{type.title}
					</StyledNavButton>
				))}
			</NavButtonsWrapper>
			<SeparatingLine />
		</>
	);
};