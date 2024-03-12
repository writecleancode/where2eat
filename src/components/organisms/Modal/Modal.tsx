import { Wrapper } from './Modal.styles';
import { ModalProps } from 'src/types/types';

export const Modal = ({ isModalOpen, children }: ModalProps) => {
	return (
		<Wrapper isOpen={isModalOpen} appElement={document.getElementById('root')!}>
			{children}
		</Wrapper>
	);
};
