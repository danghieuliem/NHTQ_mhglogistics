import BaseAPI from '../methods';

const { globalCRUD, gGetPermissionDetail, get } = new BaseAPI<TUserGroup>(
	'user-group'
);

export const userGroup = {
	...globalCRUD,
	gGetPermissionDetail,
	getPermissions: () => get<TPermissions[]>('/get-permissions')
};
