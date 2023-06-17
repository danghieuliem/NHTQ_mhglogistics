import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<
	TContentHome,
	{ FromDate: string; ToDate: string }
>('report-main-order-real');

export const money = globalCRUD;
