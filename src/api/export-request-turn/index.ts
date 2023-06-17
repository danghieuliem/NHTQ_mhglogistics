import BaseAPI from '../methods';

type TFilterParams = {
	UserName: string;
	UID: number;
	OrderTransactionCode: string;
	FromDate: string;
	ToDate: string;
	Status: number;
};

const { put, globalCRUD } = new BaseAPI<TUserStatisticalDeposit, TFilterParams>('export-request-turn');

export const exportRequestTurn = {
	...globalCRUD,

	updateNote: (params: TUserStatisticalDepositUpdateNote) => put('/update-note', undefined, { params }),

	updateStatus: (data: TUserStatisticalDepositUpdateStatus) => put('/update-status', data)
};
