import BaseAPI from '../methods';

const { get } = new BaseAPI('catalogue');

type TParams = Pick<TPaginationParams, 'SearchContent'>;

export const catalogue = {
	getShippingTypeVN: (params?: TParams) =>
		get<TShippingTypeToVN[]>('/get-shipping-type-vn-catalogue', { params }),

	getShippingTypeToWarehouse: (params?: TParams) =>
		get<TShippingTypeToWarehouse[]>(
			'/get-shipping-type-to-warehouse-catalogue',
			{ params }
		),

	getWarehouseTQ: (params?: TParams) =>
		get<TWarehouseTQCatalogue[]>('/get-warehouse-from-catalogue', { params }),

	getWarehouseVN: (params?: TParams) =>
		get<TWarehouseVNCatalogue[]>('/get-warehouse-catalogue', { params }),

	getUserGroup: (params?: TParams) =>
		get<TUserGroupCatalogue[]>('/get-user-group-catalogue', { params }),

	getUser: (params?: TParams & { UserGroupId?: number }) =>
		get<TUserCatalogue[]>('/get-user-catalogue', { params }),

	getUserLevel: (params?: TParams) =>
		get<TUserLevelCatalogue[]>('/get-user-level-catalogue', { params }),

	getBank: (params?: TParams) =>
		get<TBankCatalogue[]>('/get-bank-catalogue', { params }),

	getBigPackageCatalogue: (params?: TParams & { Status?: number }) =>
		get<TPaginationResponse<TPackage[]>>('/get-big-package-catalogue', {
			params
		}),

	getPageTypeCatalogue: (params?: TParams) =>
		get<any>('/get-page-type-catalogue', { params })
};
