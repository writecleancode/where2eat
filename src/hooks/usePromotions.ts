import { useState } from 'react';
import axios from 'axios';
import { DatoCmsPromotionsDataType, promotionsDataType } from 'src/types/types';

const query = `
{
	allPromotions {
		placeName
		image {
			url
			alt
		}
		promotionsList
	}
}
`;

export const usePromotions = () => {
	const [promotions, setPromotions] = useState<never[] | promotionsDataType[]>([]);

	const getPromotionsData = async () => {
		try {
			const {
				data: { data },
			} = await axios.post(
				'https://graphql.datocms.com/',
				{
					query: query,
				},
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_DATO_TOKEN}`,
					},
				}
			);

			const promotionsData: promotionsDataType[] = data.allPromotions.map((item: DatoCmsPromotionsDataType) => ({
				...item,
				promotionsList: JSON.parse(item.promotionsList),
			}));
			setPromotions(promotionsData);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		promotions,
		getPromotionsData,
	};
};
