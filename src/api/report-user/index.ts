import BaseAPI from '../methods';

type TFilterParams = {
	Type: number;
};

const { globalReport } = new BaseAPI<TReportUser, TFilterParams>('report-user');

export const reportUser = globalReport;
