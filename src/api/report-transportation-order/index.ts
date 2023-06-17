import BaseAPI from '../methods';

type TFilterParams = {
	FromDate: string;
	ToDate: string;
};

const { globalReport, post } = new BaseAPI<
	TReportTransportationOrder,
	TFilterParams
>('report-transportation-order');

export const reportTransportationOrder = {
	...globalReport,
	exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
		post('/export-excel', undefined, { params })
};
