import { Header } from 'src/components/molecules/Header/Header';
import { NavDeskopColumn } from 'src/components/molecules/NavDesktopColumn/NavDesktopColumn';
import { NavLinksFilters } from 'src/components/molecules/NavLinksFilters/NavLinksFilters';
import { NavLinks } from 'src/components/molecules/NavLinks/NavLinks';
import { ContentWrapper } from './MainTemplate.styles';
import { MainTemplateProps } from 'src/types/types';

export const MainTemplate = ({ children }: MainTemplateProps) => {
	return (
		<div>
			<Header />
			<ContentWrapper>
				<NavDeskopColumn>
					<NavLinksFilters $isDesktop />
					<NavLinks />
				</NavDeskopColumn>
				{children}
				<NavDeskopColumn $isLargeScreenOnly>
					<NavLinksFilters />
				</NavDeskopColumn>
			</ContentWrapper>
		</div>
	);
};
