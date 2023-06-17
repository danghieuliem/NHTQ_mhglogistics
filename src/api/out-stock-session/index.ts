import BaseAPI from '../methods';

type TFilterParams = {
	Status: number;
	FromDate: string;
	ToDate: string;
};

const {
	globalCRUD,
	get,
	delete: dlt,
	put,
	gGetPermissionDetail
} = new BaseAPI<TOutStockSession, TFilterParams>('out-stock-session');

export const outStockSession = {
	...globalCRUD,

	gGetPermissionDetail,

	deleteNotePayment: (params: { Id: number }) =>
		dlt('/delete-not-payment', { params }),

	export: (params: { Id: number }) => put('/export', undefined, { params }),

	updateStatus: (data: {
		Id: number;
		/** 2: Thanh toán */
		Status: 2;
		IsPaymentWallet: boolean;
	}) => put('/update-status', data)
};
