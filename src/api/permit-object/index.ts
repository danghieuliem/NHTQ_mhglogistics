import BaseAPI from '../methods';

const { globalCRUD, get, put } = new BaseAPI<TPermit>('permit-object');

export const permitObject = {
	...globalCRUD,
	getControllerList: () => get<TApi[]>('/get-catalogue-controller'),
	getUserGroups: (params) =>
		get<TUserGroupPermit[]>('/user-group-for-permit-object', { params }),
	updateUserGroups: (data: TUpdateUserGroupPermit[]) =>
		put('/user-group-for-permit-object', data)
};
