import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TStep>('step');

export const step = globalCRUD;
