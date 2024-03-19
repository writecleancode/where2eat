import React from 'react';
import type { Preview } from '@storybook/react';
import { AppProviders } from '../src/providers/AppProviders';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		Story => (
			<AppProviders>
				<Story />
			</AppProviders>
		),
	],
};

export default preview;
