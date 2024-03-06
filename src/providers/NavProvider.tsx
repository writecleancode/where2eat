import { ReactNode, createContext, useState } from 'react';

type NavProviderProps = {
	children: ReactNode;
};

export const NavContext = createContext({
	isNavOpen: false,
	handleNav: () => {},
	closeNav: () => {},
});

export const NavProvider = ({ children }: NavProviderProps) => {
	const [isNavOpen, setNavState] = useState(false);

	const handleNav = () => setNavState(prevState => !prevState);
	const closeNav = () => setNavState(false);

	return (
		<NavContext.Provider
			value={{
				isNavOpen,
				handleNav,
				closeNav,
			}}>
			{children}
		</NavContext.Provider>
	);
};
