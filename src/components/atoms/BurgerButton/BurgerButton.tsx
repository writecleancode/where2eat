import { HamburgerWrapper } from './BurherButton.styles';

export const BurgerButton = ({ ...props }) => {
	return (
		<HamburgerWrapper {...props}>
			<span className='hamburger-box'>
				<span className='hamburger-inner'></span>
			</span>
		</HamburgerWrapper>
	);
};
