import { useContext } from 'react';
import { NavContext } from 'src/providers/NavProvider';
import { HamburgerLineBottom, HamburgerLineMiddle, HamburgerLineTop, HamburgerWrapper } from './BurgerButton.styles';

type BurgerButtonProps = {
	onClick: () => void;
};

export const BurgerButton = ({ ...props }: BurgerButtonProps) => {
	const { isNavOpen } = useContext(NavContext);

	return (
		<HamburgerWrapper {...props}>
			<HamburgerLineTop $isNavOpen={isNavOpen} />
			<HamburgerLineMiddle $isNavOpen={isNavOpen} />
			<HamburgerLineBottom $isNavOpen={isNavOpen} />
		</HamburgerWrapper>
	);
};
