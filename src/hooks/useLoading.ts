import { useState } from 'react';

const initialLoadingState = true;

export const useLoading = () => {
	const [isLoading, setLoadingState] = useState(initialLoadingState);

	const setLoadingCompleted = () => setLoadingState(false);

	return {
		isLoading,
		setLoadingCompleted,
	};
};
