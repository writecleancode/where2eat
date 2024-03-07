import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	border: 1px solid ${({ theme }) => theme.colors.black25};
	width: 100%;
	background-color: #f6f6f6;

	@media (min-width: 460px) {
		max-width: 240px;
	}
`;

export const StyledInput = styled.input`
	flex-grow: 1;
	padding: 0.4rem 0.8rem;
	border: none;
	background-color: transparent;
	font-size: 1.4rem;
`;

export const StyledIcon = styled.img`
	padding: 0.4rem;
	border-left: 1px solid ${({ theme }) => theme.colors.black25};
`;
