import styled from 'styled-components';

export const HorizontalLine = styled.span<{ $isShort?: boolean }>`
	display: block;
	margin-top: 1.6rem;
	max-width: 70%;
	min-height: 1px;
	background-color: ${({ theme }) => theme.colors.black50};

	@media (min-width: 1400px) {
		margin-top: 5.6rem;
		margin-bottom: 0.8rem;
		max-width: unset;
		background-color: ${({ theme }) => theme.colors.black25};
	}
`;
