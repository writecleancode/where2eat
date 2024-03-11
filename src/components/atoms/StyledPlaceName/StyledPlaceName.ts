import styled from "styled-components";

export const StyledPlaceName = styled.p`
	padding: 0.4rem;
	background-color: #555555;
	color: #fff;
	font-weight: bold;
	text-align: center;

	@media (min-width: 640px) {
		padding-left: 0.8rem;
		padding-right: 0.8rem;
	}

	@media (min-width: 680px) {
		font-size: 1.8rem;
		padding-left: 1.6rem;
		padding-right: 1.6rem;
	}
`;