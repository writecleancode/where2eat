import styled from 'styled-components';

export const Wrapper = styled.div`
	position: relative;
	width: 100%;

	@media (min-width: 460px) {
		max-width: 240px;
	}
`;

export const StyledSelect = styled.select`
	display: inline-block;
	padding: 0.6rem 0.8rem;
	padding-right: calc(0.8rem + 2.4rem);
	border: 1px solid ${({ theme }) => theme.colors.black25};
	width: 100%;
	min-height: 100%;
	background-color: #f6f6f6;
	font-size: 1.4rem;
	appearance: none;
`;

export const StyledOption = styled.option`
	color: #282828;
`;

export const SelectArrowDown = styled.img`
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.4rem;
	pointer-events: none;
`;
