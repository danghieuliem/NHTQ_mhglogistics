import BaseAPI from '../methods';

type TFilterParams = {
	FromDate: string;
	ToDate: string;
};

const { globalReport } = new BaseAPI<any, TFilterParams>('report-pay-help');

export const reportPayHelp = globalReport;
