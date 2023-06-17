import BaseAPI from '../methods';

type TFilterParams = {
	FromDate: string;
	ToDate: string;
	UID: number;
	RoleID?: number;
};

const { globalReport } = new BaseAPI<TReportPayOrderHistory, TFilterParams>(
	'report-pay-order-history'
);

export const reportPayOrderHistory = {...globalReport};
