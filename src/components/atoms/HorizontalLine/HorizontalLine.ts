import styled from 'styled-components';

export const HorizontalLine = styled.span<{ $isShort?: boolean }>`
	display: block;
	margin-top: 1.6rem;
	max-width: 70%;
	min-height: 1px;
	background-color: ${({ theme }) => theme.colors.black50};
`;
