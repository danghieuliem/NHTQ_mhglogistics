import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TBank>('bank');

export const bank = globalCRUD;
