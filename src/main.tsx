import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/assets/styles/fonts.css';
import { Root } from './views/Root.tsx';

const enableMocking = async () => {
	const { worker } = await import('./mocks/browser.ts');
	const workerUrl =
		process.env.NODE_ENV === 'development' ? '/mockServiceWorker.js' : 'https://writecleancode.github.io/where2eat/mockServiceWorker.js';

	return worker.start({
		serviceWorker: {
			url: workerUrl,
		},
		onUnhandledRequest: 'bypass',
	});
};

enableMocking().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<Root />
		</React.StrictMode>
	);
});
