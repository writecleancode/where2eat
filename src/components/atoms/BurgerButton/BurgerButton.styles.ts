import styled from 'styled-components';

export const HamburgerWrapper = styled.button`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-left: auto;
	padding: 1.2rem;
	border: none;
	background-color: transparent;
	translate: 0.8rem;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.6;
	}

	@media (min-width: 1020px) {
		display: none;
	}
`;

export const HamburgerLine = styled.span<{ $isNavOpen: boolean }>`
	display: block;
	border-radius: 100px;
	width: 32px;
	min-height: 3px;
	background-color: ${({ theme }) => theme.colors.black};
	transition: translate 0.3s, opacity 0.3s, rotate 0.3s;
`;

export const HamburgerLineTop = styled(HamburgerLine)`
	transform-origin: right;
	rotate: ${({ $isNavOpen }) => ($isNavOpen ? '-45deg' : '0')};
	translate: ${({ $isNavOpen }) => ($isNavOpen ? '-5px -3px' : '')};
`;

export const HamburgerLineMiddle = styled(HamburgerLine)`
	translate: ${({ $isNavOpen }) => ($isNavOpen ? '100%' : '')};
	opacity: ${({ $isNavOpen }) => ($isNavOpen ? '0' : '1')};
`;

export const HamburgerLineBottom = styled(HamburgerLine)`
	transform-origin: right;
	rotate: ${({ $isNavOpen }) => ($isNavOpen ? '45deg' : '0')};
	translate: ${({ $isNavOpen }) => ($isNavOpen ? '-5px 3px' : '')};
`;
