import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { MobileNav } from 'src/components/organisms/MobileNav/MobileNav';
import { BurgerButton } from 'src/components/atoms/BurgerButton/BurgerButton';
import { AppTitle, AppDescription, Wrapper, DecorationLine, TitleWrapper } from './Header.styles';

export const Header = () => {
	const { handleNav, closeNav } = useContext(NavContext);

	return (
		<Wrapper>
			<TitleWrapper>
				<AppTitle href='#' onClick={closeNav}>
					<h1>
						Where2<span>Eat</span>
					</h1>
				</AppTitle>
				<DecorationLine />
				<AppDescription>Find place to kill your hunger</AppDescription>
				<BurgerButton onClick={handleNav} />
			</TitleWrapper>
			<MobileNav />
		</Wrapper>
	);
};
