import { fireEvent, render, screen, waitFor } from 'src/test-utils';
import { setupServer } from 'msw/node';
import { handlers } from 'src/mocks/handlers';
import { RoutesProvider } from 'src/helpers/RoutesProvider';
import { NavLinksFilters } from 'src/components/molecules/NavLinksFilters/NavLinksFilters';
import { NavLinks } from 'src/components/molecules/NavLinks/NavLinks';

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

	it('Checks if choosing place type displays only matching places', async () => {
		render(
			<>
				<RoutesProvider />
				<NavLinksFilters />
			</>
		);

		const pizzeriaTypeButton = screen.getByText('pizzeria');
		const pizzeria = await screen.findByText('Da Grasso');
		const fastFood = screen.getByText("McDonald's");

		fireEvent.click(pizzeriaTypeButton);
		await waitFor(() => {
			expect(fastFood).not.toBeVisible();
		});
		expect(pizzeria).toBeVisible();

		fireEvent.click(screen.getByText('any'));
	});

	it('Checks if choosing place category displays only matching places', async () => {
		render(
			<>
				<RoutesProvider />
				<NavLinks />
			</>
		);

		const highlyRatedButton = screen.getByText('Highly rated');
		const highlyRatedPlace = await screen.findByText('Vino Rosso');
		const notHighlyRaptedPlace = screen.getByText('KFC');

		fireEvent.click(highlyRatedButton);
		await waitFor(() => {
			expect(notHighlyRaptedPlace).not.toBeVisible();
		});
		expect(highlyRatedPlace).toBeVisible();

		fireEvent.click(screen.getByText('All'));
	});

	it('Checks if message of no results is displayed if there are no matching places', async () => {
		render(
			<>
				<RoutesProvider />
				<NavLinksFilters />
				<NavLinks />
			</>
		);

		const barTypeButton = screen.getByText('bar');
		const highlyRatedButton = screen.getByText('Highly rated');
		fireEvent.click(barTypeButton);
		fireEvent.click(highlyRatedButton);
		await screen.findByText('No highly rated catering establishments of type bar found in your area');

		fireEvent.click(screen.getByText('any'));
		fireEvent.click(screen.getByText('All'));
	});
});
