import { useState } from 'react';

export const useError = () => {
	const [errorMessage, setErrorMessage] = useState('');

	const clearErrorMessage = () => setErrorMessage('');

	const displayErrorMessage = (category?: string, type?: string) => {
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
