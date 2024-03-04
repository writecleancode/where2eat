import styled from 'styled-components';

export const Wrapper = styled.button`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.4rem;
	border: 1px solid ${({ theme }) => theme.colors.black90};
	border-radius: 8px;
	background-color: transparent;
	overflow: hidden;
	transition: border-radius 0.5s;

	&:hover {
		border-radius: 20px;
	}
`;

export const Icon = styled.img`
	transition: clip-path 0.3s;
`;

export const IconTwo = styled(Icon)<{ $isActive: boolean }>`
	position: absolute;
	inset: 0;
	padding: inherit;
	background-color: #fff;
	clip-path: ${({ $isActive }) =>
		$isActive ? 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'};
`;
