import styled from 'styled-components';

export const NavButtonsWrapper = styled.div<{ $isDesktop?: boolean }>`
	display: ${({ $isDesktop }) => ($isDesktop ? 'none' : 'flex')};
	flex-direction: column;
	gap: 0.8rem;

	@media (min-width: 600px) {
		padding: 1.6rem 0;
	}
`;
