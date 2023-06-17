import BaseAPI from '../methods';

type TFilterParams = {
	Name: string;
};

const { globalCRUD, get } = new BaseAPI<TPage, TFilterParams>('page');

export const Page = {
	...globalCRUD,
	getByCode: (code: string) => get<any>(`/get-by-code`, { params: { code } })
};
