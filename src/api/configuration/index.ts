import BaseAPI from '../methods';

const { globalCRUD, get } = new BaseAPI<any>('configuration');

export const configuration = {
	...globalCRUD,

	getCurrency: () => get('/get-currency')
};
