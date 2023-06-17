import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TTariffTQVN>('warehouse-fee');

export const warehouseFee = globalCRUD;
