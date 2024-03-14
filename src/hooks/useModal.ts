import { useState } from 'react';

export const useModal = (initialState = false) => {
	const [isModalOpen, setModalState] = useState(initialState);

	const handleOpenModal = () => setModalState(true);

	const handleCloseModal = () => setModalState(false);

	return {
		isModalOpen,
		handleOpenModal,
		handleCloseModal,
	};
};
