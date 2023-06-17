import BaseAPI from '../methods';

type TFilterParams = {
	UID: number;
	ShopId: number;
};

const { globalCRUD, put } = new BaseAPI<TUserCartOrderTemp, TFilterParams>('order-temp');

export const orderTemp = {
	...globalCRUD,

	updateField: (data: { Id: number; Quantity: number }) => put<TUserCartOrderTemp>('/update-brand-and-quantity', data)
};
