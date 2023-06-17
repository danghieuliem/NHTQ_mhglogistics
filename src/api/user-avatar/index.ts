import BaseAPI from '../methods';

type TUserAvatar = {
  avatarIMG: string,
  userId: number
}

const { globalCRUD, gGetPermissionDetail, post } = new BaseAPI<TUserAvatar>(
	'user/update-avatar'
);

export const userAvatar = {
	...globalCRUD,
	gGetPermissionDetail,
	getPermissions: () => post<TPermissions[]>('user/update-avatar')
};