import styled from 'styled-components';

export const HamburgerWrapper = styled.button`
	display: inline-block;
	display: flex;
	align-items: center;
	margin-left: auto;
	padding: 1.2rem;
	border: 0;
	background-color: transparent;
	overflow: visible;
	translate: 0.8rem;
	transition-property: opacity, filter;
	transition-duration: 0.15s;
	transition-timing-function: linear;

	&:hover {
		opacity: 0.7;
	}

	/* .is-active:hover {
		opacity: 0.7;
	}
	.is-active .hamburger-inner,
	.is-active .hamburger-inner::before,
	.is-active .hamburger-inner::after {
		background-color: #000;
	} */

	.hamburger-box {
		position: relative;
		display: inline-block;
		width: 32px;
		min-height: 20px;
	}

	.hamburger-inner {
		top: 50%;
		display: block;
		margin-top: -2px;
	}

	.hamburger-inner,
	.hamburger-inner::before,
	.hamburger-inner::after {
		position: absolute;
		border-radius: 100px;
		width: 32px;
		min-height: 3px;
		background-color: ${({ theme }) => theme.colors.black};
		transition-property: transform;
		transition-duration: 0.15s;
		transition-timing-function: ease;
	}

	.hamburger-inner::before,
	.hamburger-inner::after {
		content: '';
		display: block;
	}

	.hamburger-inner::before {
		top: -9px;
	}

	.hamburger-inner::after {
		bottom: -9px;
	}

	[is-active='true'] {
		&:hover {
			opacity: 0.7;
		}
	}

	[is-active='true'] .hamburger-inner,
	[is-active='true'] .hamburger-inner::before,
	[is-active='true'] .hamburger-inner::after {
		background-color: ${({ theme }) => theme.colors.black};
	}
`;

/*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
