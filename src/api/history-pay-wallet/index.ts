import BaseAPI from '../methods';

type TFilterParams = {
	UID: number;
	Status: number;
	FromDate: string;
	ToDate: string;
};

const { globalCRUD, post } = new BaseAPI<TUserHistoryTransactionVND, TFilterParams>('history-pay-wallet');

export const historyPayWallet = {
	...globalCRUD,
	getExportExcel: (params: Partial<TPaginationParams & TFilterParams>) => post("/export-excel", undefined, {params})
};
