import { useState } from 'react';
import { MobileNav } from 'src/components/organisms/MovileNav/MobileNav';
import { BurgerButton } from 'src/components/atoms/BurgerButton/BurgerButton';
import { AppTitle, AppDescription, Wrapper, DecorationLine, TitleWrapper } from './Header.styles';

export const Header = () => {
	const [isNavOpen, setNavState] = useState(false);

	const handleNav = () => setNavState(prevState => !prevState);
	const closeNav = () => setNavState(false)

	return (
		<Wrapper>
			<TitleWrapper>
				<AppTitle>
					Where2<span>Eat</span>
				</AppTitle>
				<DecorationLine />
				<AppDescription>Find place to kill your hunger</AppDescription>
				<BurgerButton isNavOpen={isNavOpen} onClick={handleNav} />
			</TitleWrapper>
			<MobileNav isNavOpen={isNavOpen} closeNav={closeNav} />
		</Wrapper>
	);
};
