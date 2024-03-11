import { ReactNode } from 'react';
import { Wrapper } from './Modal.styles';

type ModalProps = {
	isModalOpen: boolean;
	children: ReactNode;
};

export const Modal = ({ isModalOpen, children }: ModalProps) => {
	return (
		<Wrapper isOpen={isModalOpen} appElement={document.getElementById('root')!}>
			{children}
		</Wrapper>
	);
};
