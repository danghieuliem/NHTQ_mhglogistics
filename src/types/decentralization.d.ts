// api user-group
type TUserGroup = {
	UserIds: number[];
	UserInGroups: any[];
	PermitObjectPermissions: TPermitObjectPermissions[];
	PermitObjects: TPermit[];
	Code: string;
	Name: string;
	Description: string;
	Id: number;
	Created: Date;
	CreatedBy: string;
};

type TPermitObjectPermissions = {
	PermitObjectId: number;
	PermissionId?: number;
	UserGroupId?: number;
	Permissions: string;
	Id?: number;
};

type TPermissions = {
	Code: string;
	Name: string;
	Description: string;
	Id: number;
	Created: Date;
	CreatedBy: string;
};
type TApi = {
	Id: string;
	Name: string;
};
