import { render, screen } from 'src/test-utils';
import { setupServer } from 'msw/node';
import { handlers } from 'src/mocks/handlers';
import { RoutesProvider } from 'src/helpers/RoutesProvider';

const server = setupServer(...handlers);

describe('Catering Establishments Cards', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('Checks if loading animation is displayed', () => {
		render(<RoutesProvider />);

		screen.getByAltText(/loading/);
	});

	it('Checks if catering establishments are displayed correctly', async () => {
		render(<RoutesProvider />);

		await screen.findByText('Da Grasso');
		screen.getByText('Aleja Ducha Świętego 34, Kraków');
		screen.getAllByText(/pizzeria/);
		screen.getAllByText('4.4 / 5');
		screen.getAllByAltText('pizza');
		screen.getAllByLabelText('Show more details');
		screen.getAllByLabelText('Mark as visited');
		screen.getAllByLabelText('Add to favourites');
	});
});
