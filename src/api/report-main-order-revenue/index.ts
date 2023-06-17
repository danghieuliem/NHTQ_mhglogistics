import BaseAPI from '../methods';

type TFilterParams = {
	/**
	 * 1. Thống kê cho doanh thu cho saler
	 * 2. Thốnt kê doanh cho cho đặt hàng
	 */
	Type: 1 | 2;
	Status: number;
	FromDate: string;
	ToDate: string;
};

const { globalReport, post } = new BaseAPI<
	TReportMainOrderRevenue,
	TFilterParams
>('report-main-order-revenue');

export const reportMainOrderRevenue = {
	...globalReport,
	exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
		post('/export', undefined, { params })
};
