import BaseAPI from "../methods";

type TFilterParams = {
	Id: number;
	UserName: string;
	Phone: string;
	UserGroupId: number;
	Status: number;
	RoleID: number;
	UID: number;


	SalerID: number;
	OrdererID: number;
};

const {globalCRUD, post, gGetPermissionDetail} = new BaseAPI<
	TEmployee | TClient,
	TFilterParams
>("user");

export const user = {
	...globalCRUD,
	exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
		post("/export-excel", undefined, {params}),
	gGetPermissionDetail,
} as const;
