import { BurgerButton } from 'src/components/atoms/BurgerButton/BurgerButton';
import { AppTitle, AppDescription, Wrapper, DecorationLine } from './Header.styles';

export const Header = () => {
	return (
		<Wrapper>
			<AppTitle>
				Where2<span>Eat</span>
			</AppTitle>
			<DecorationLine />
			<AppDescription>Find place to kill your hunger</AppDescription>
			<BurgerButton />
		</Wrapper>
	);
};
