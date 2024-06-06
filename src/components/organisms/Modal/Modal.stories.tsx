import { Modal } from './Modal';
import { CateringEstablishmentDetails } from 'src/components/molecules/CateringEstablishmentDetails/CateringEstablishmentDetails';

const mockedPlace = {
	id: '11',
	type: 'pizzeria',
	typeName: 'pizzeria',
	name: 'O Sole Mio',
	imgURL: 'img/o_sole_mio.jpg',
	imgAlt: 'pizza',
	adress: 'Wolności 100, Kraków',
	adressLong: 'Wolności 100, 30-661 Kraków',
	distance: '4.3',
	ratings: '4.9',
	prices: '$$',
	phoneNumber: '17 583 20 30',
	openHours: [
		{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Sunday' },
		{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Monday' },
		{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Tuesday' },
		{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Wednesday' },
		{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Thursday' },
		{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Friday' },
		{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Saturday' },
	],
	isVisited: false,
	isFavourite: false,
};

const meta = {
	title: 'Components/Organisms/Modal',
	component: Modal,
	parameters: {
		layout: 'centered',
	},
	args: {
		isModalOpen: true,
	},
};

export default meta;

export const Default = {
	args: {
		children: <CateringEstablishmentDetails cateringEstablishment={mockedPlace} handleCloseModal={() => {}} />,
	},
};
