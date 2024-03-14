import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledNavLink = styled(Link)<{
	$isActive: boolean;
	$isReversed?: boolean;
	$isDisabled?: boolean;
	tabIndex?: string;
}>`
	position: relative;
	display: inline-block;
	padding: 0.4rem 1.6rem;
	border: none;
	width: 100%;
	background-color: transparent;
	color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primaryLight : 'inherit')};
	font-size: 1.8rem;
	font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
	text-align: ${({ $isReversed }) => ($isReversed ? 'right' : 'left')};
	text-transform: uppercase;
	transition: color 0.3s, font-weight 0.3s;

	${({ $isDisabled }) =>
		$isDisabled
			? `
	opacity: 0.5;
	pointer-events: none;
	`
			: ''}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background-image: ${({ $isReversed }) =>
			$isReversed
				? 'linear-gradient(-90deg, #d9d9d9 0%, #e5e5e500 85%)'
				: 'linear-gradient(90deg, #d9d9d9 0%, #e5e5e500 85%)'};
		opacity: ${({ $isActive }) => ($isActive ? '1' : '0.6')};
		transition: opacity 0.2s;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		${({ $isReversed }) => ($isReversed ? 'right: 0;' : 'left: 0;')}
		width: 3px;
		background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : theme.colors.black)};
		translate: ${({ $isReversed }) => ($isReversed ? '100%' : '-100%')};
		transition: background-color 0.2s;
	}

	&:hover {
		&::before {
			opacity: 1;
		}

		&::after {
			background-color: ${({ theme }) => theme.colors.primary};
		}
	}

	@media (min-width: 1400px) {
		text-align: ${({ $isReversed }) => (!$isReversed ? 'right' : 'left')};

		&::before {
			background-image: ${({ $isReversed }) =>
				!$isReversed
					? 'linear-gradient(-90deg, #d9d9d9 0%, #e5e5e500 85%)'
					: 'linear-gradient(90deg, #d9d9d9 0%, #e5e5e500 85%)'};
		}

		&::after {
			left: auto;
			right: auto;
			${({ $isReversed }) => (!$isReversed ? 'right: 0;' : 'left: 0;')}
			translate: ${({ $isReversed }) => (!$isReversed ? '100%' : '-100%')};
		}
	}
`;
