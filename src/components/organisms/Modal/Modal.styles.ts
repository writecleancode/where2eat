import styled from 'styled-components';
import ReactModal from 'react-modal';

export const Wrapper = styled(ReactModal)`
	margin-top: 1.6rem;
	margin-bottom: 1.6rem;
	margin-left: auto;
	margin-right: auto;
	padding: 1.6rem;
	background-color: #fff;
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.14);
	width: fit-content;

	@media (min-height: 560px) {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		margin: 0;
		width: auto;
	}
`;
