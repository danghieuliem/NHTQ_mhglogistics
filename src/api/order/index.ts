import BaseAPI from '../methods';

type TFilterParams = {
	UID: number;
};

const { globalCRUD, post } = new BaseAPI<TOrder, TFilterParams>(
	'order'
);

export const order = {
	...globalCRUD,
	
	exportExcel: (params: {MainOrderID: number}) =>
		post("/export-excel", undefined, {params}),
};
