import { createContext, useState } from 'react';
import { CategoryContextType, CategoryProviderProps } from 'src/types/types';

export const CategoryContext = createContext<CategoryContextType>({
	currentCategory: '',
	setCategory: () => {},
});

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
	const [currentCategory, setCurrentCategory] = useState('');

	const setCategory = (category = 'all') => setCurrentCategory(category);

	return (
		<CategoryContext.Provider
			value={{
				currentCategory,
				setCategory,
			}}>
			{children}
		</CategoryContext.Provider>
	);
};
