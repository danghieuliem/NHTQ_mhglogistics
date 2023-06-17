import BaseAPI from '../methods';

type TFilterParams = {
	FromDate: string;
	ToDate: string;
};

const { globalReport, post } = new BaseAPI<TReportWithdraw, TFilterParams>(
	'report-withdraw'
);

export const reportWithdraw = {
	...globalReport,
	exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
		post('/export', undefined, { params })
};
