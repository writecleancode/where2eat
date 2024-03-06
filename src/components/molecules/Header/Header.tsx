import { useState } from 'react';
import { BurgerButton } from 'src/components/atoms/BurgerButton/BurgerButton';
import { MobileNav } from 'src/components/organisms/MovileNav/MobileNav';
import { AppTitle, AppDescription, Wrapper, DecorationLine, TitleWrapper } from './Header.styles';

export const Header = () => {
	const [isNavOpen, setNavState] = useState(false);

	const handleNav = () => setNavState(prevState => !prevState);

	return (
		<Wrapper>
			<TitleWrapper>
				<AppTitle>
					Where2<span>Eat</span>
				</AppTitle>
				<DecorationLine />
				<AppDescription>Find place to kill your hunger</AppDescription>
				<BurgerButton onClick={handleNav} />
			</TitleWrapper>
			<MobileNav isNavOpen={isNavOpen} />
		</Wrapper>
	);
};
