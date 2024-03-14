import styled from 'styled-components';

export const NavDeskopColumn = styled.div<{ $isLargeScreenOnly?: boolean }>`
	display: none;
	padding: 4.8rem 2.4rem;

	@media (min-width: 1020px) {
		display: ${({ $isLargeScreenOnly }) => ($isLargeScreenOnly ? 'none' : 'block')};
	}

	@media (min-width: 1400px) {
		display: block;
	}
`;
