import BaseAPI from '../methods';

type TFilterParams = {
	FromDate: string;
	ToDate: string;
};

const { globalReport } = new BaseAPI<TReportHistoryPayWallet, TFilterParams>(
	'report-history-pay-wallet'
);

export const reportHistoryPayWallet = globalReport;
