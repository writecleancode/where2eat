import { Wrapper } from './Modal.styles';
import { ModalProps } from 'src/types/types';

export const Modal = ({ isModalOpen, handleCloseModal, children }: ModalProps) => {
	return (
		<Wrapper isOpen={isModalOpen} onRequestClose={handleCloseModal} appElement={document.getElementById('root')!}>
			{children}
		</Wrapper>
	);
};
