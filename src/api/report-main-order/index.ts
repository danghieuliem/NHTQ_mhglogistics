import BaseAPI from '../methods';

type TFilterParams = {
	Status: number;
	FromDate: string;
	ToDate: string;
	UID: number;
	RoleID?: number;
};

const { globalReport, post, get } = new BaseAPI<
	TReportMainOrder,
	TFilterParams
>('report-main-order');

export const reportMainOrder = {
	...globalReport,
	exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
		post('/export', undefined, { params }),
	getTotalOverview: (params: Partial<TPaginationParams & TFilterParams>) =>
		get('/get-total-overview', { params })
};
