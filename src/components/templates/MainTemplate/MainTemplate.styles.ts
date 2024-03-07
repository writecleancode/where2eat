import styled from 'styled-components';

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div`
	max-width: calc(1400px + 3.2rem);
	margin-left: auto;
	margin-right: auto;

	@media (min-width: 1020px) {
		display: grid;
		grid-template-columns: auto 1fr;
	}

	@media (min-width: 1400px) {
		grid-template-columns: 1fr 2fr 1fr;
	}
`;
