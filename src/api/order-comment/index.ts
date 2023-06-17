import BaseAPI from '../methods';

type TFilterParams = {
	mainOrderId: number;
	type: number;
    
};

const { globalCRUD, gGetPermissionDetail } = new BaseAPI<
	TMessage,
	TFilterParams
>('order-comment');

export const orderComment = { ...globalCRUD, gGetPermissionDetail };
