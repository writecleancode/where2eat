import { ReactNode } from 'react';
import { ContentWrapper, Wrapper } from './MainTemplate.styles';
import { Header } from 'src/components/molecules/Header/Header';
import { NavDeskopColumn } from 'src/components/molecules/NavDesktopColumn/NavDesktopColumn';
import { NavLinksFilters } from 'src/components/molecules/NavLinksFilters/NavLinksFilters';
import { NavLinks } from 'src/components/molecules/NavLinks/NavLinks';

type MainTemplateProps = {
	children?: ReactNode;
};

export const MainTemplate = ({ children }: MainTemplateProps) => {
	return (
		<Wrapper>
			<Header />
			<ContentWrapper>
				<NavDeskopColumn>
					<NavLinksFilters $isDesktop />
					<NavLinks />
				</NavDeskopColumn>
				{children}
				<NavDeskopColumn>
					<NavLinksFilters />
				</NavDeskopColumn>
			</ContentWrapper>
		</Wrapper>
	);
};
