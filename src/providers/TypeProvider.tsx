import { createContext, useState } from 'react';
import { TypeContextType, TypeProviderProps } from 'src/types/types';

export const TypeContext = createContext<TypeContextType>({
	currentType: '',
	setType: () => {},
});

export const TypeProvider = ({ children }: TypeProviderProps) => {
	const [currentType, setCurrentType] = useState('');

	const setType = (type = 'any') => setCurrentType(type);

	return (
		<TypeContext.Provider
			value={{
				currentType,
				setType,
			}}>
			{children}
		</TypeContext.Provider>
	);
};
