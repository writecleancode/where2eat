import styled from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: 1fr;

	@media (min-width: 1020px) {
		grid-template-columns: auto 1fr;
	}
`;
