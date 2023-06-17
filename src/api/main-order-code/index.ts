import BaseAPI from '../methods';

type TFilterParams = {
	MainOrderID: number;
};

const { globalCRUD } = new BaseAPI<TMainOrderCode, TFilterParams>('main-order-code');

export const mainOrderCode = globalCRUD;
