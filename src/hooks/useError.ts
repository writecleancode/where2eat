import { useState } from 'react';

export const useError = () => {
	const [errorMessage, setErrorMessage] = useState('');

	const clearErrorMessage = () => setErrorMessage('');

	const displayErrorMessage = (category?: string, type?: string, isSearchActive?: boolean) => {
		if (isSearchActive) {
			setErrorMessage('No matching catering establishments found in your area');
			return;
		}

		const categoryText = (!category || category === 'all' ? '' : category).replace('-', ' ');
		const typeText = (!type || type === 'any' ? '' : `of type ${type}`).replace('-', ' ');

		setErrorMessage(`No ${categoryText} catering establishments ${typeText} found in your area`);
	};

	return {
		errorMessage,
		displayErrorMessage,
		clearErrorMessage,
	};
};
