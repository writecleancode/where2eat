import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/assets/styles/fonts.css'
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/styles/theme.ts';
import { GlobalStyle } from './assets/styles/GlobalStyle.tsx';
import { Root } from './views/Root.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Root />
		</ThemeProvider>
	</React.StrictMode>
);
