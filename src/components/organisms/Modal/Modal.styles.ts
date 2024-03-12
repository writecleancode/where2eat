import styled from 'styled-components';
import ReactModal from 'react-modal';

export const Wrapper = styled(ReactModal)`
	position: absolute;
	top: 0;
	left: 50%;
	translate: -50%;
	z-index: 99;
	padding: 1.6rem;
	background-color: #fff;
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.14);

	margin-top: 1.6rem;
	margin-bottom: 1.6rem;

	@media (min-height: 560px) {
		top: 50%;
		translate: -50% -50%;
		margin-top: 0;
	}
`;
