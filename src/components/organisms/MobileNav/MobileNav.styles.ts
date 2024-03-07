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
		$isActive ? 'polygon(0 0, 100% 0%, 100% 103%, 0% 103%)' : 'polygon(0 0, 100% 0%, 100% 0%, 0 0%)'};
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

	@media (min-width: 1020px) {
		display: none;
	}
`;
