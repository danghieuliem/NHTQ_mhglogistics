import BaseAPI from '../methods';

type TFilterParams = {
	UID: number;
	MainOrderId: number;
	Status: number;
	FromDate: string;
	ToDate: string;
};

const { gGetList, post } = new BaseAPI<any, TFilterParams>(
	'report-out-stock-session'
);

export const outStockSessionReport = {
	getList: gGetList,
	export: (params: TPaginationParams & TFilterParams) =>
		post('/export', undefined, { params })
} as const;
