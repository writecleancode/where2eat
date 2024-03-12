import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { NavLinksFilters } from 'src/components/molecules/NavLinksFilters/NavLinksFilters';
import { NavLinks } from 'src/components/molecules/NavLinks/NavLinks';
import { Wrapper } from './MobileNav.styles';

export const MobileNav = () => {
	const { isNavOpen } = useContext(NavContext);

	return (
		<Wrapper $isActive={isNavOpen}>
			<NavLinksFilters />
			<div>
				<NavLinks />
			</div>
		</Wrapper>
	);
};
