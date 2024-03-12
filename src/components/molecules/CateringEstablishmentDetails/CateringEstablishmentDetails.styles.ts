import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	@media (min-width: 600px) {
		gap: 1.6rem;
	}
`;

export const ListAndImgWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	@media (min-width: 600px) {
		flex-direction: row;
		gap: 1.6rem;
	}
`;

export const StyledPicture = styled.img`
	width: 100%;

	@media (min-width: 600px) {
		width: auto;
		max-width: 286px;
	}
`;

export const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	padding: 0 0.8rem;

	@media (min-width: 600px) {
		padding: 0;
		gap: 0.4rem;
	}
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

export const DayOfWeek = styled.p`
	color: #636363;
	font-size: 1.2rem;
`;

export const ContactWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 0 0.8rem;

	@media (min-width: 600px) {
		flex-direction: row;
		justify-content: space-between;
		gap: 2.4rem;
		padding: 0;
	}
`;

export const CloseButton = styled.button`
	padding: 0.2rem 0.8rem;
	border: none;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.primary};
	transition: opacity 0.3s;

	img {
		width: 2.8rem;
		height: 2.8rem;
	}

	&:hover {
		opacity: 0.7;
	}

	@media (min-width: 600px) {
		img {
			width: 3.2rem;
			height: 3.2rem;
		}
	}
`;
