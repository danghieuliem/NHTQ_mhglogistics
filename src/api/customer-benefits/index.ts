import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TCustomerBenefit>('customer-benefits');

export const customerBenefits = globalCRUD;
