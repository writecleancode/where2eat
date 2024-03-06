import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { MobileNav } from 'src/components/organisms/MovileNav/MobileNav';
import { BurgerButton } from 'src/components/atoms/BurgerButton/BurgerButton';
import { AppTitle, AppDescription, Wrapper, DecorationLine, TitleWrapper } from './Header.styles';

export const Header = () => {
	const { handleNav } = useContext(NavContext);

	return (
		<Wrapper>
			<TitleWrapper>
				<AppTitle href='#'>
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
