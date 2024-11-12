import { Dispatch, ReactNode, SetStateAction } from 'react';

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

export type promotionsDataType = {
	placeName: string;
	image: {
		url: string;
		alt: string;
	};
	promotionsList: string[];
};

export type DatoCmsPromotionsDataType = {
	placeName: string;
	image: {
		url: string;
		alt: string;
	};
	promotionsList: string;
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
	handleVisitedStatus: (index: number, id: string) => void;
	handleFavouritesStatus: (index: number, id: string) => void;
	cateringEstablishment: catetingEstablishmentsType;
};

export type CateringEstablishmentDetailsProps = {
	handleCloseModal: () => void;
	cateringEstablishment: catetingEstablishmentsType;
};

export type NavLinksFiltersProps = {
	$isDesktop?: boolean;
};

export type PromotionsCardProps = {
	promotionItem: promotionsDataType;
};

export type ModalProps = {
	isModalOpen: boolean;
	handleCloseModal: () => void;
	children: ReactNode;
};

export type MainTemplateProps = {
	children?: ReactNode;
};

export type AppProvidersType = {
	children: ReactNode;
};

export type CategoryContextType = {
	currentCategory: string;
	setCategory: (category: string) => void;
};

export type CategoryProviderProps = {
	children: ReactNode;
};

export type CateringEstablishmentsContextType = {
	cateringEstablishments: never[] | catetingEstablishmentsType[];
	setSortedCateringEstablishments: (placesToSort: catetingEstablishmentsType[]) => void;
	isLoading: boolean;
	selectValue: string;
	setSelectValue: Dispatch<SetStateAction<string | string>>;
	isSearchActive: boolean;
	handleSearchState: (searchPhrase: string) => void;
	getSortedCateringEstablishments: (category: string | undefined, type: string | undefined) => Promise<void>;
	toggleVisitedStatus: (index: number) => void;
	toggleFavouriteStaus: (index: number) => void;
};

export type CateringEstablishmentsProviderProps = {
	children: ReactNode;
};

export type NavProviderProps = {
	children: ReactNode;
};

export type TypeContextType = {
	currentType: string;
	setType: (type: string) => void;
};

export type TypeProviderProps = {
	children: ReactNode;
};
