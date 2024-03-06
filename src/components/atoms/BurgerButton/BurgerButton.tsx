import { HamburgerLineBottom, HamburgerLineMiddle, HamburgerLineTop, HamburgerWrapper } from './BurgerButton.styles';

type BurgerButtonProps = {
	isNavOpen: boolean;
	onClick: () => void;
};

export const BurgerButton = ({ isNavOpen, ...props }: BurgerButtonProps) => {
	return (
		<HamburgerWrapper {...props}>
			<HamburgerLineTop $isNavOpen={isNavOpen} />
			<HamburgerLineMiddle $isNavOpen={isNavOpen} />
			<HamburgerLineBottom $isNavOpen={isNavOpen} />
		</HamburgerWrapper>
	);
};
