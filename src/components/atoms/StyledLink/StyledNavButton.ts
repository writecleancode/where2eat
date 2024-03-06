import styled from 'styled-components';

export const StyledNavButton = styled.button<{ $isActive: boolean; $isReversed?: boolean }>`
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

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background-image: ${({ $isReversed }) =>
			$isReversed
				? 'linear-gradient(-90deg, #e5e5e5 0%, #d9d9d900 85%)'
				: 'linear-gradient(90deg, #e5e5e5 0%, #d9d9d900 85%)'};
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
		/* color: ${({ theme }) => theme.colors.primaryLight}; */

		&::before {
			opacity: 1;
		}

		&::after {
			background-color: ${({ theme }) => theme.colors.primary};
		}
	}
`;