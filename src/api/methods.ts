import { AxiosRequestConfig } from 'axios';
import instance from './instance';

export default class BaseAPI<
	T extends unknown = unknown,
	P extends object = {}
> {
	private _router: string;

	constructor(router: string) {
		this._router = router;
	}

	// Method API List
	get = async <TResult extends any = any>(
		url: string = '',
		axiosRequestConfig?: AxiosRequestConfig
	) => {
		try {
			const res = await instance.get<TResponse<TResult>>(
				`/${this._router}${url}`,
				axiosRequestConfig
			);
			return res.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	post = async <TResult extends any = any>(
		url: string = '',
		data?: any,
		axiosRequestConfig?: AxiosRequestConfig
	) => {
		try {
			const res = await instance.post<TResponse<TResult>>(
				`/${this._router}${url}`,
				data,
				axiosRequestConfig
			);
			return res.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	put = async <TResult extends any = any>(
		url: string = '',
		data?: any,
		axiosRequestConfig?: AxiosRequestConfig
	) => {
		try {
			const res = await instance.put<TResponse<TResult>>(
				`/${this._router}${url}`,
				data,
				axiosRequestConfig
			);
			return res.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	delete = async <TResult extends any = any>(
		url: string = '',
		axiosRequestConfig?: AxiosRequestConfig
	) => {
		try {
			const res = await instance.delete<TResponse<TResult>>(
				`/${this._router}${url}`,
				axiosRequestConfig
			);
			return res.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	// global CRUD API
	gGetList = (
		params?: TPaginationParams & Partial<P> | any,
		axiosRequestConfig?: AxiosRequestConfig
	) =>
		this.get<TPaginationResponse<T[]>>(undefined, {
			...axiosRequestConfig,
			params: { OrderBy: 'Id desc', ...params }
		});

	gGetById = (
		id: number,
		params?: Partial<P>,
		axiosRequestConfig?: AxiosRequestConfig
	) => this.get<T>(`/${id}`, { params, ...axiosRequestConfig });

	gCreate = (data?: Partial<T>, axiosRequestConfig?: AxiosRequestConfig) =>
		this.post<T>(undefined, data, axiosRequestConfig);

	gUpdate = (data?: Partial<T>, axiosRequestConfig?: AxiosRequestConfig) =>
		this.put<T | T[]>(undefined, data, axiosRequestConfig);

	gDelete = (id: number, axiosRequestConfig?: AxiosRequestConfig) =>
		this.delete(`/${id}`, axiosRequestConfig);

	gGetPermissionDetail = () => this.get('/get-permission-detail');

	gExport = (
		params?: TPaginationParams & Partial<P>,
		axiosRequestConfig?: AxiosRequestConfig
	) => this.post<T>('/export', undefined, { ...axiosRequestConfig, params });

	globalCRUD = {
		getList: this.gGetList,
		getByID: this.gGetById,
		create: this.gCreate,
		update: this.gUpdate,
		delete: this.gDelete,
	};

	globalReport = { getList: this.gGetList, export: this.gExport };
}
