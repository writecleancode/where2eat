import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	margin-top: 1.6rem;
	padding: 0.8rem;

	@media (min-width: 680px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding: 1.6rem;
	}

	@media (min-width: 1020px) {
		margin-top: 2.4rem;
	}
`;
