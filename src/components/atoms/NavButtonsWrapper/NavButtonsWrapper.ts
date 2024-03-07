import styled from 'styled-components';

export const NavButtonsWrapper = styled.div<{ $isDesktop?: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	@media (min-width: 600px) {
		padding: 1.6rem 0;
	}

	@media (min-width: 1400px) {
		${({ $isDesktop }) => ($isDesktop ? 'display: none;' : '')};
	}
`;
