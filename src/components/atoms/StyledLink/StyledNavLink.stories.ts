import { StyledNavLink } from './StyledNavButton';

const meta = {
	title: 'Components/Atoms/StyledLink',
	component: StyledNavLink,
	parameters: {
		layout: 'centered',
	},
	args: {
		children: 'favourites',
	},
};

export default meta;

export const Default = {};

export const ActiveLink = {
	args: {
		$isActive: true,
	},
};

export const LongLink = {
	args: {
		children: 'ongoing promotions',
		$isActive: false,
	},
};
