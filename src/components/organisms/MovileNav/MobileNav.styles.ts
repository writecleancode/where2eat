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
		$isActive ? 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0 0, 100% 0%, 100% 0%, 0 0%)'};
	pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
	transition: clip-path 0.4s;
`;

export const NavButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

export const HorizontalLine = styled.span<{ $isShort?: boolean }>`
	display: block;
	margin-top: 2.4rem;
	margin-bottom: 0.8rem;
	${({ $isShort }) => ($isShort ? 'max-width: 70%;' : '')}
	min-height: 1px;
	background-color: ${({ theme }) => theme.colors.black50};
`;
