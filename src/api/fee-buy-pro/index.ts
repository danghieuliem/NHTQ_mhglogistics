import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TTariffBuyPro>('fee-buy-pro');

export const feeBuyPro = globalCRUD;
