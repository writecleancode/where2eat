import { ReactNode, createContext, useState } from 'react';

type TypeContextType = {
	currentType: string;
	setType: (type: string) => void;
};

type TypeProviderProps = {
	children: ReactNode;
};

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
