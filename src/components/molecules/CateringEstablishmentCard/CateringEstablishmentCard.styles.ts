import styled from 'styled-components';
import { StyledPlaceName } from 'src/components/atoms/StyledPlaceName/StyledPlaceName';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 0.8rem;
	border: 1px solid ${({ theme }) => theme.colors.black25};
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.14);

	@media (min-width: 400px) {
		display: grid;
		grid-template-rows: repeat(3, auto);
		grid-template-columns: 1fr auto;
	}

	@media (min-width: 640px) {
		grid-template-rows: auto 1fr;
		grid-template-columns: auto 1fr auto;
	}

	@media (min-width: 680px) {
		grid-column-gap: 1.6rem;
		padding: 1.6rem;
	}
`;

export const Title = styled(StyledPlaceName)`
	@media (min-width: 400px) {
		grid-row: 1 / 2;
		grid-column: 1 / 3;
	}

	@media (min-width: 640px) {
		grid-row: 1 / 2;
		grid-column: 2 / 4;
		text-align: left;
	}

	@media (min-width: 680px) {
		font-size: 1.8rem;
	}
`;

export const Picture = styled.img`
	max-width: 100%;

	@media (min-width: 400px) {
		grid-row: 2 / 3;
		grid-column: 1 / 3;
	}

	@media (min-width: 640px) {
		grid-row: 1 / 3;
		grid-column: 1 / 2;
		max-width: 260px;
	}
`;

export const InfoWrapper = styled.div`
	@media (min-width: 640px) {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
`;

export const InfoRow = styled.div`
	display: flex;
	align-items: center;
	gap: 2.4rem;

	@media (min-width: 400px) {
		grid-row: 3 / 4;
		grid-column: 1 / 2;
	}

	@media (min-width: 640px) {
		grid-row: 2 / 3;
		grid-column: 2 / 3;
	}
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

	@media (min-width: 400px) {
		grid-row: 3 / 4;
		grid-column: 2 / 3;
		flex-direction: column;
		gap: 0.8rem;
	}

	@media (min-width: 640px) {
		grid-row: 2 / 3;
		grid-column: 3 / 4;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;
