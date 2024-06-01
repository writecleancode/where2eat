import { PromotionsCard } from './PromotionsCard';

const meta = {
	title: 'Components/Molecules/PromotionsCard',
	component: PromotionsCard,
	parameters: {
		layout: 'centered',
	},
	args: {
		promotionItem: {
			placeName: 'Ga Grasso',
			image: {
				url: '/img/da_grasso.jpg',
				alt: 'pizza',
			},
			promotionsList: [
				'Pepsi 0.5l to every takeaway order',
				'2 x pizza 42cm for 20$',
				'on wednesdays: large pizza at price of medium',
			],
		},
	},
};

export default meta;

export const Default = {};
