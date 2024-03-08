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
	openHours: {
		monday: string;
		tuesday: string;
		wednesday: string;
		thursday: string;
		friday: string;
		suturday: string;
		saunday: string;
	};
};