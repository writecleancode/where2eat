import styled from 'styled-components';

export const NoResultsText = styled.p`
	grid-column: 1 / 3;
	margin-top: 4rem;
	padding: 0 0.8rem;
	font-size: 1.8rem;
	color: ${({ theme }) => theme.colors.black90};
	text-align: center;
`;
