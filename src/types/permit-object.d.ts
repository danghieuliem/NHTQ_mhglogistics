type TController = Pick<TBaseReponseParams, 'Id' | 'Name'>;

type TPermit = TBaseReponseParams & {
	ControllerNames: string;
	Controllers: string[];
	Code: string;
	Name: string;
	Description: string;
	UserGroupId: number;
	PermitObjectPermissions: TPermitObjectPermissions[];
	PermitObjectId: number;
};

// update
type TUpdateUserGroupPermit = {
	userGroupId: number;
	permitObjectId: number;
	permissionId: number;
	isCheck: boolean;
	name?: string;
};

type TUserGroupPermit = {
	PermitObjectId: number;
	Permissions: string;
	UserGroupId: number;
	Id: 723;
};
