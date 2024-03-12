import { Wrapper } from './Modal.styles';
import { ModalProps } from 'src/types/types';

export const Modal = ({ isModalOpen, handleCloseModal, children }: ModalProps) => {
	return (
		<Wrapper
			isOpen={isModalOpen}
			onRequestClose={handleCloseModal}
			style={{
				overlay: { zIndex: '2', overflowY: 'scroll' },
			}}
			appElement={document.getElementById('root')!}>
			{children}
		</Wrapper>
	);
};
