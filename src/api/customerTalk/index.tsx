import BaseAPI from "../methods";

const {globalCRUD, get, post, put} = new BaseAPI<TCustomerBenefit>("customer-talk");

export const customerTalk = {
	...globalCRUD,
};
