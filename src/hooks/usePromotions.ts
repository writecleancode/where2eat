import { useState } from 'react';
import axios from 'axios';

export const usePromotions = () => {
	const [promotions, setPromotions] = useState([]);

	const getPromotionsData = async () => {
		try {
			const { data } = await axios.get('/promotions');
			setPromotions(data.promotions);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		promotions,
		getPromotionsData,
	};
};
