import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TTariffPriceChange>('price-change');

export const priceChange = globalCRUD;
