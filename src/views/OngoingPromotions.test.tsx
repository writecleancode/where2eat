import { render, screen } from 'src/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { OngoingPromotions } from './OngoingPromotions';

const mock = new MockAdapter(axios);

const query = `
{
	allPromotions {
		placeName
		image {
			url
			alt
		}
		promotionsList
	}
}
`;

describe('Ongoing Promotions', () => {
	it('Checks if loading animations is displayed', () => {
		render(<OngoingPromotions />);
		screen.getByAltText('loading animation');
	});

	it('Checks if message is displayed when there are no promotions', async () => {
		mock
			.onPost('https://graphql.datocms.com/', {
				query,
			})
			.reply(200, {
				data: {
					allPromotions: [],
				},
			});

		render(<OngoingPromotions />);
		await screen.findByText('There are no available promotions right now.');
	});

	it('Checks if promotions are displayed correctly', async () => {
		mock
			.onPost('https://graphql.datocms.com/', {
				query,
			})
			.reply(200, {
				data: {
					allPromotions: [
						{
							placeName: 'Da Grasso',
							image: { url: '/src/assets/img/da_grasso.jpg', alt: 'alt text' },
							promotionsList:
								'["Pepsi 0.5l to every takeaway order","2 x pizza 42cm for 20$","on wednesdays: large pizza at price of medium"]',
						},
					],
				},
			});

		render(<OngoingPromotions />);
		await screen.findByText(/large pizza at price of medium/);
	});
});
