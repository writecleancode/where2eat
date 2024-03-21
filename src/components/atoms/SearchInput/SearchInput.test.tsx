import { fireEvent, render, screen, waitFor } from 'src/test-utils';
import { setupServer } from 'msw/node';
import { handlers } from 'src/mocks/handlers';
import { RoutesProvider } from 'src/helpers/RoutesProvider';

const server = setupServer(...handlers);

describe('Search Input', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('Checks if only matching place is displayed', async () => {
		render(<RoutesProvider />);

		const searchInput = screen.getByLabelText('search');
		const matchingPlace = await screen.findByText('Da Grasso');
		const mismatchedPlace = await screen.findByText("McDonald's");

		fireEvent.change(searchInput, { target: { value: 'grasso' } });
		await waitFor(() => {
			expect(mismatchedPlace).not.toBeVisible();
		});
		expect(matchingPlace).toBeVisible();
	});

	it('Checks if message is displayed if there are no places matching search phrase', async () => {
		render(<RoutesProvider />);

		const searchInput = screen.getByLabelText('search');
		const place = await screen.findByText('Da Grasso');

		fireEvent.change(searchInput, { target: { value: 'there is no such place' } });
		await screen.findByText('No matching catering establishments found in your area');
		expect(place).not.toBeVisible();
	});
});
