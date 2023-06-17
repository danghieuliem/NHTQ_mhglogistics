import BaseAPI from '../methods';

const { globalCRUD: trackingGloalCURD, get } = new BaseAPI<TStep>('tracking');

export const tracking = {
	...trackingGloalCURD,
	getByTransactionCode: (params: { TransactionCode: string }) =>
		get<(TWarehouseVN | TWarehouseCN)[]>('/', {
			params
		}),
};

const {globalCRUD, post } = new BaseAPI("search")

export const searchAPI = {
	...globalCRUD,
	getSearch: (data) => post("", data)
}