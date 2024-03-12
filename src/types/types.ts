import { ReactNode } from "react";

export type catetingEstablishmentsType = {
	id: string;
	type: string;
	typeName: string;
	name: string;
	imgURL: string;
	imgAlt: string;
	adress: string;
	adressLong: string;
	distance: string;
	ratings: string;
	prices: string;
	phoneNumber: string;
	openHours: { openingAt: string; closingAt: string; dayOfWeek: string }[];
	isVisited: boolean;
	isFavourite: boolean;
};

export type BurgerButtonProps = {
	onClick: () => void;
};

export type IconButtonProps = {
	iconURL: string;
	iconTwoURL?: string;
	label: string;
	isActive?: boolean;
	onClick?: () => void;
};

export type CateringEstablishmentCardProps = {
	index: number;
	handleOpenModal: (placeId: string) => void;
	markAsVisited: (index: number, id: string) => void;
	addToFavourites: (index: number, id: string) => void;
	cateringEstablishment: catetingEstablishmentsType;
};

export type CateringEstablishmentDetailsProps = {
	handleCloseModal: () => void;
	cateringEstablishment: catetingEstablishmentsType;
};

export type NavLinksFiltersProps = {
	$isDesktop?: boolean;
};

export type ModalProps = {
	isModalOpen: boolean;
	children: ReactNode;
};

export type MainTemplateProps = {
	children?: ReactNode;
};