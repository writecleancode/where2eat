import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { catetingEstablishmentsType } from 'src/types/types';

type CateringEstablishmentsContextType = {
	cateringEstablishments: never[] | catetingEstablishmentsType[];
	setCateringEstablishments: Dispatch<SetStateAction<never[] | catetingEstablishmentsType[]>>;
};

export const CateringEstablishmentsContext = createContext<CateringEstablishmentsContextType>({
	cateringEstablishments: [],
	setCateringEstablishments: () => {},
});

type CateringEstablishmentsProviderProps = {
	children: ReactNode;
};

export const CateringEstablishmentsProvider = ({ children }: CateringEstablishmentsProviderProps) => {
	const [cateringEstablishments, setCateringEstablishments] = useState<never[] | catetingEstablishmentsType[]>([]);

	return (
		<CateringEstablishmentsContext.Provider
			value={{
				cateringEstablishments,
				setCateringEstablishments,
			}}>
			{children}
		</CateringEstablishmentsContext.Provider>
	);
};
