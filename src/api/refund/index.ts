import BaseAPI from '../methods';

const { globalCRUD, put } = new BaseAPI<
	TRefund,
	TPaginationParams & { Status: number }
>('refund');

export const refund = {
	...globalCRUD,
	updateStatus: (params: { Id: number; Status: number }) =>
		put('/update-status', undefined, { params })
} as const;
