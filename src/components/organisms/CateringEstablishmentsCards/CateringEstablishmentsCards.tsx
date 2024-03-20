import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useModal } from 'src/hooks/useModal';
import { useError } from 'src/hooks/useError';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { navCategories } from 'src/data/navCategories';
import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import axios from 'axios';
import { CateringEstablishmentCard } from 'src/components/molecules/CateringEstablishmentCard/CateringEstablishmentCard';
import { Modal } from '../Modal/Modal';
import { CateringEstablishmentDetails } from 'src/components/molecules/CateringEstablishmentDetails/CateringEstablishmentDetails';
import { NoResultsText } from 'src/components/atoms/NoResultsText/NoResultsText';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { Wrapper } from './CateringEstablishmentsCards.styles';
import { catetingEstablishmentsType } from 'src/types/types';

export const CateringEstablishmentsCards = () => {
	const {
		cateringEstablishments,
		getSortedCateringEstablishments,
		isLoading,
		toggleVisitedStatus,
		toggleFavouriteStaus,
		isSearchActive,
	} = useContext(CateringEstablishmentsContext);
	const [currentPlace, setCurrentPlace] = useState<catetingEstablishmentsType>(cateringEstablishments[0]);
	const { category, type } = useParams();
	const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
	const { errorMessage, displayErrorMessage, clearErrorMessage } = useError();
	const { setCategory } = useContext(CategoryContext);
	const { setType } = useContext(TypeContext);

	const handleVisitedStatus = async (index: number, id: string) => {
		toggleVisitedStatus(index);

		try {
			await axios.post('/visited', { clickedId: id });
			if (category === 'unvisited') getSortedCateringEstablishments(category, type);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFavouritesStatus = async (index: number, id: string) => {
		toggleFavouriteStaus(index);

		try {
			await axios.post('/favourites', { clickedId: id });
			if (category === 'favourites') getSortedCateringEstablishments(category, type);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDisplayPlaceDetails = (placeId: string) => {
		const matchingPlace = cateringEstablishments.find(place => place.id === placeId);
		matchingPlace && setCurrentPlace(matchingPlace);
		handleOpenModal();
	};

	useEffect(() => {
		getSortedCateringEstablishments(category, type);

		category && setCategory(category);
		type && setType(type);
	}, [category, type]);

	useEffect(() => {
		cateringEstablishments.length === 0 ? displayErrorMessage(category, type, isSearchActive) : clearErrorMessage();
	}, [cateringEstablishments]);

	if (!category) return <Navigate to={`/${navCategories[0].path}/${cateringEstabilishmentsTypes[0].path}`} />;
	if (category && category !== 'ongoing-promotions' && !type)
		return <Navigate to={`/${category}/${cateringEstabilishmentsTypes[0].path}`} />;

	return (
		<Wrapper>
			{cateringEstablishments.length ? (
				<>
					{cateringEstablishments.map((cateringEstablishment, index) => (
						<CateringEstablishmentCard
							key={cateringEstablishment.id}
							cateringEstablishment={cateringEstablishment}
							index={index}
							handleOpenModal={handleDisplayPlaceDetails}
							handleVisitedStatus={handleVisitedStatus}
							handleFavouritesStatus={handleFavouritesStatus}
						/>
					))}
					<Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
						<CateringEstablishmentDetails cateringEstablishment={currentPlace} handleCloseModal={handleCloseModal} />
					</Modal>
				</>
			) : isLoading ? (
				<LoadingGif />
			) : (
				<NoResultsText>{errorMessage}</NoResultsText>
			)}
		</Wrapper>
	);
};
