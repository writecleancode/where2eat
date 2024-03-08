import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/assets/styles/fonts.css';
import { NavProvider } from './providers/NavProvider.tsx';
import { Root } from './views/Root.tsx';

const enableMocking = async () => {
	const { worker } = await import('./mocks/browser.ts');

	return worker.start({
		onUnhandledRequest: 'bypass',
	});
};

enableMocking().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<NavProvider>
				<Root />
			</NavProvider>
		</React.StrictMode>
	);
});
