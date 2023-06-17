import BaseAPI from '../methods';

type TFilterParams = {
	BankId: number;
	FromDate: string;
	ToDate: string;
};

const { globalReport, post } = new BaseAPI<
	TReportAdminSendUserWallet,
	TFilterParams
>('report-admin-send-user-wallet');

export const reportAdminSendUserWallet = {
	...globalReport,
	exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
		post('/export', undefined, { params })
};
