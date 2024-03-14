import axios from 'axios';

export const usePlaces = () => {
	const getCateringEstablishments = async (category: string | undefined, type: string | undefined) => {
		try {
			const { data } = await axios.get(`/${category}/${type}`);
			return data.matchingCateringEstablishments;
		} catch (error) {
			console.log(error);
		}
	};

	const getSortOptions = async () => {
		try {
			const { data } = await axios.get('/sort-options');
			return data.sortOptions;
		} catch (error) {
			console.log(error);
		}
	};

	const findPlaces = async (currentCategory: string, currentType: string, searchPhrase: string) => {
		try {
			const { data } = await axios.post(`/${currentCategory}/${currentType}`, { searchPhrase: searchPhrase });
			return data.matchingCateringEstablishments;
		} catch (error) {
			console.log(error);
		}
	};

	return {
		getCateringEstablishments,
		getSortOptions,
		findPlaces,
	};
};
