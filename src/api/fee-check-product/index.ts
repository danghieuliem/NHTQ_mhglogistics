import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TTariffGoodsChecking>('fee-check-product');

export const feeGoodsChecking = globalCRUD;
