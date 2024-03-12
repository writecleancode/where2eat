import styled from 'styled-components';
import ReactModal from 'react-modal';

export const Wrapper = styled(ReactModal)`
	position: absolute;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	z-index: 99999;
	padding: 1.6rem;
	background-color: #fff;
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.14);
	overflow: scroll;
`;
