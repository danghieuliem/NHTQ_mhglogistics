import BaseAPI from '../methods';

type TFilterParams = {
	Name: string;
};

const { globalCRUD, get } = new BaseAPI<TPageType, TFilterParams>('page-type');

export const pageType = {
	...globalCRUD,
	getByCode: (code: any) => get<any>(`/get-by-code`, { params: { code } })
};
