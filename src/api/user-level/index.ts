import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TTariffUser>('user-level');

export const userLevel = globalCRUD;
