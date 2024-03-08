import { ReactNode, createContext, useState } from 'react';

type CategoryContextType = {
	currentCategory: string;
	setCategory: (category: string) => void;
};

type CategoryProviderProps = {
	children: ReactNode;
};

export const CategoryContext = createContext<CategoryContextType>({
	currentCategory: '',
	setCategory: () => {},
});

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
	const [currentCategory, setCurrentCategory] = useState('');

	const setCategory = (category: string) => setCurrentCategory(category);

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
