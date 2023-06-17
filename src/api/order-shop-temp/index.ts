import BaseAPI from "../methods";

type TFilterParams = {
	UID: number;
};

const {globalCRUD, put, post, get} = new BaseAPI<TUserCartOrderShopTemp, TFilterParams>("order-shop-temp");

export const orderShopTemp = {
	...globalCRUD,

	updateField: (data: TUserCartOrderShopTemp) => put("/update-field", data),

	updateNote: (params: {Note: string; Id: number}) => put("/update-note", undefined, {params}),

	payment: (data: TUserPayment) => post("/payment", data),

	getTotalPrice: (params: {id: number[]}) => get("/get-total-price", {params}),

	addSame: (params: {Id: number}) => post("/add-same", {...params}),
};
