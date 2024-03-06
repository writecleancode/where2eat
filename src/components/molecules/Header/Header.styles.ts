import styled from 'styled-components';

export const Wrapper = styled.div`
	position: relative;
	position: sticky;
	top: 0;
	z-index: 9999;
`;

export const TitleWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.4rem 0.8rem;
	background-color: #f2f2f2;
	text-align: center;

	@media (min-width: 400px) {
		padding-left: 1.2rem;
		padding-right: 1.2rem;
	}

	@media (min-width: 600px) {
		justify-content: flex-start;
		gap: 1.6rem;
	}
`;

export const AppTitle = styled.a`
	padding: 0.3rem 0.8rem;
	translate: -0.8rem;

	h1 {
		font-size: 2.4rem;
		font-weight: bold;
	}

	span {
		color: ${({ theme }) => theme.colors.primaryLight};
	}
`;

export const DecorationLine = styled.span`
	display: none;
	margin: 0.4rem 0;
	width: 1px;
	min-height: 100%;
	background-color: ${({ theme }) => theme.colors.black25};

	@media (min-width: 680px) {
		display: block;
		align-self: stretch;
	}
`;

export const AppDescription = styled.p`
	display: none;
	font-size: 1.6rem;

	@media (min-width: 680px) {
		display: block;
	}
`;
