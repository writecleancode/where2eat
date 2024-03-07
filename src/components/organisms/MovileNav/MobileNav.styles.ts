import styled from 'styled-components';

export const Wrapper = styled.div<{ $isActive: boolean }>`
	position: absolute;
	z-index: 999;
	padding: 1.6rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.black25};
	width: 100%;
	background-color: #f2f2f2;
	background-color: #fff;
	box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.3);
	clip-path: ${({ $isActive }) =>
		$isActive ? 'polygon(0 0, 100% 0%, 100% 102%, 0% 102%)' : 'polygon(0 0, 100% 0%, 100% 0%, 0 0%)'};
	pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
	transition: clip-path 0.4s;

	overflow: scroll;
	max-height: calc(100vh - 51px);

	@media (min-width: 600px) {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr auto 1fr;
		gap: 2.4rem;
	}
`;

export const NavButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	@media (min-width: 600px) {
		padding: 1.6rem 0;
	}
`;

export const HorizontalLine = styled.span<{ $isShort?: boolean }>`
	display: block;
	margin-top: 1.6rem;
	max-width: 70%;
	min-height: 1px;
	background-color: ${({ theme }) => theme.colors.black50};
`;

export const SeparatingLine = styled(HorizontalLine)`
	margin-top: 2.4rem;
	margin-bottom: 0.8rem;
	max-width: none;

	@media (min-width: 600px) {
		width: 1px;
		margin: 0;
		background-color: ${({ theme }) => theme.colors.black10};
	}
`;
