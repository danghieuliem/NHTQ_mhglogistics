import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TContentHome>('menu');

export const menu = globalCRUD;
