export type catetingEstablishmentsType = {
	id: string;
	type: string;
	name: string;
	imgURL: string;
	imgAlt: string;
	adress: string;
	adressLong: string;
	distance: string;
	ratings: string;
	prices: string;
	phoneNumber: string;
	openHours: { openingAt: string; closingAt: string }[];
	isVisited: boolean;
	isFavourite: boolean;
};
