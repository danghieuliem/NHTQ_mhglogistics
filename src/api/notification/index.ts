import BaseAPI from "../methods";

const {globalCRUD, get, put, post} = new BaseAPI<TNotification, {FromDate: string; ToDate: string}>("notification");

export const getAllNewNotify = {
	...globalCRUD,
	getAll: (params: {OfEmployee: boolean}) => get<any>("/get-total-notification", {params}),
	readNotify: (ids: number[]) => post<any>("/read-user-notifications", ids),
};

// export const hiddenNotify = {
// 	...globalCRUD,
// 	hidden: (ids: number[]) => put<any>("/hidden-user-notifications", ids),
// };

export const notification = globalCRUD;
