import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

export const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	padding: 0 0.8rem;
`;

export const StyledListItem = styled.li`
	display: flex;
	align-items: center;
	gap: 1.6rem;
	min-width: max-content;

	&:first-child {
		order: 1;
	}
`;

export const ListAndImgWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

export const StyledPicture = styled.img`
	width: 100%;
`;

export const ContactWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 0 0.8rem;
`;

export const CloseButton = styled.button`
	padding: 0.4rem 0.8rem;
	border: none;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.primary};
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}
`;
