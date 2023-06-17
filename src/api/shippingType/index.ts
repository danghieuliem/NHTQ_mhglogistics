import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TStep>('shippingtypetowarehouse');

export const shipping = globalCRUD;
