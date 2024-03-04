import { ReactNode } from 'react';
import { Wrapper } from './MainTemplate.styles';
import { Header } from 'src/components/molecules/Header/Header';

type MainTemplateProps = {
	children?: ReactNode;
};

export const MainTemplate = ({ children }: MainTemplateProps) => {
	return (
		<Wrapper>
			<Header />
			{children}
		</Wrapper>
	);
};
