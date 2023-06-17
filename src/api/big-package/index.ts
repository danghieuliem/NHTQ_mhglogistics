import BaseAPI from '../methods';

const { globalCRUD, post } = new BaseAPI<TPackage>('big-package');

export const bigPackage = {
	...globalCRUD,
	exportExcel: (params: Partial<TPaginationParams & TPackage>) =>
		post('/export-excel', undefined, { params })
};
