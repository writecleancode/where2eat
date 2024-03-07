import styled from 'styled-components';
import { HorizontalLine } from 'src/components/atoms/HorizontalLine/HorizontalLine';

export const SeparatingLine = styled(HorizontalLine)`
	margin-top: 2.4rem;
	margin-bottom: 0.8rem;
	max-width: none;

	@media (min-width: 600px) {
		width: 1px;
		margin: 0;
		background-color: ${({ theme }) => theme.colors.black10};
	}

	@media (min-width: 1020px) {
		margin-top: 2.4rem;
		margin-bottom: 0.8rem;
		width: auto;
		background-color: ${({ theme }) => theme.colors.black50};
		transform: scaleX(1.1);
	}

	@media (min-width: 1400px) {
		display: none;
	}
`;
