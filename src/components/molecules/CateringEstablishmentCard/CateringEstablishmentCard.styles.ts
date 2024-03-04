import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 0.8rem;
	border: 1px solid ${({ theme }) => theme.colors.black25};
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.14);
`;

export const Title = styled.p`
	padding: 0.4rem;
	background-color: #555555;
	color: #fff;
	font-weight: bold;
	text-align: center;
`;

export const Picture = styled.img`
	max-width: 100%;
`;

export const InfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 2.4rem;
`;

export const Info = styled.p`
	&::first-letter {
		text-transform: uppercase;
	}
`;

export const InfoDesciption = styled.p`
	color: #636363;
	font-size: 1.2rem;
`;

export const IconsWrapper = styled.div`
	display: flex;
	gap: 1.6rem;
`;
