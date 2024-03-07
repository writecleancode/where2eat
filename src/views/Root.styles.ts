import styled from 'styled-components';

export const Wrapper = styled.div`
	margin-top: 1.6rem;
	padding: 0.8rem;

	@media (min-width: 680px) {
		padding: 1.6rem;
	}
`;

export const ControlsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	@media (min-width: 460px) {
		flex-direction: row-reverse;
		justify-content: space-between;
	}

	@media (min-width: 500px) {
		gap: 1.6rem;
	}

	@media (min-width: 680px) {
		gap: 3.2rem;
	}
`;
