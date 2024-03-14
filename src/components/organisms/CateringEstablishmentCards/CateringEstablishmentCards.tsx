import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePlaces } from 'src/hooks/usePlaces';
import { useModal } from 'src/hooks/useModal';
import { CateringEstablishmentsContext } from 'src/providers/CateringEstablishmentsProvider';
import { CategoryContext } from 'src/providers/CategoryProvider';
import { TypeContext } from 'src/providers/TypeProvider';
import { navCategories } from 'src/data/navCategories';
import { cateringEstabilishmentsTypes } from 'src/data/cateringEstabilishmentsTypes';
import axios from 'axios';
import { CateringEstablishmentCard } from 'src/components/molecules/CateringEstablishmentCard/CateringEstablishmentCard';
import { Modal } from '../Modal/Modal';
import { CateringEstablishmentDetails } from 'src/components/molecules/CateringEstablishmentDetails/CateringEstablishmentDetails';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { Wrapper } from './CateringEstablishmentCards.styles';
import { catetingEstablishmentsType } from 'src/types/types';

export const CateringEstablishmentCards = () => {
	const { cateringEstablishments, setCateringEstablishments, setSortedCateringEstablishments } =
		useContext(CateringEstablishmentsContext);
	const [currentPlace, setCurrentPlace] = useState<catetingEstablishmentsType>(cateringEstablishments[0]);
	const { category, type } = useParams();
	const { getCateringEstablishments } = usePlaces();
	const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
	const { setCategory } = useContext(CategoryContext);
	const { setType } = useContext(TypeContext);

	const getSortedCateringEstablishments = async () => {
		const data = await getCateringEstablishments(category, type);
		setSortedCateringEstablishments(data);
	};

	const handleDisplayPlaceDetails = (placeId: string) => {
		const matchingPlace = cateringEstablishments.find(place => place.id === placeId);
		matchingPlace && setCurrentPlace(matchingPlace);
		handleOpenModal();
	};

	const markAsVisited = (index: number, id: string) => {
		setCateringEstablishments([
			...cateringEstablishments.slice(0, index),
			{ ...cateringEstablishments[index], isVisited: !cateringEstablishments[index].isVisited },
			...cateringEstablishments.slice(index + 1),
		]);

		axios
			.post('/visited', { clickedId: id })
			.then(() => {
				if (category === 'unvisited') {
					getSortedCateringEstablishments();
				}
			})
			.catch(error => console.log(error));
	};

	const addToFavourites = (index: number, id: string) => {
		setCateringEstablishments([
			...cateringEstablishments.slice(0, index),
			{ ...cateringEstablishments[index], isFavourite: !cateringEstablishments[index].isFavourite },
			...cateringEstablishments.slice(index + 1),
		]);

		axios
			.post('/favourites', { clickedId: id })
			.then(() => {
				if (category === 'favourites') {
					getSortedCateringEstablishments();
				}
			})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		getSortedCateringEstablishments();

		category && setCategory(category);
		type && setType(type);
	}, [category, type]);

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
							markAsVisited={markAsVisited}
							addToFavourites={addToFavourites}
						/>
					))}
					<Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
						<CateringEstablishmentDetails cateringEstablishment={currentPlace} handleCloseModal={handleCloseModal} />
					</Modal>
				</>
			) : (
				<LoadingGif />
			)}
		</Wrapper>
	);
};
