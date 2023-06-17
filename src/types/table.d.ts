import { TablePaginationConfig } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import { ColumnType } from 'antd/lib/table';
import { TModalType } from './field';

type TActionButton = 'view' | 'edit';

type TColumnType<T extends object = object> = ColumnType<T> & {
	key?: keyof T;
	dataIndex: keyof T;
};

type TAction = { action?: string[] };

type TColumnsType<T extends object> = TColumnType<T & TAction>[];

type TModalType = 'add' | 'update' | 'delete';

type TDepositType = 'one' | 'some' | 'all';
type TPaymentType = 'one' | 'some' | 'all';

type TTable<T extends object = object> = {
	data: T[];
	handleModal?: (
		item?: T | T[],
		type?: TModalType,
		depositType?: TDepositType
	) => void;
	handleConfirm?: (record?: T) => void;
	pagination?: TablePaginationConfig;
	handlePagination?: (
		pagination: TablePaginationConfig,
		filter,
		sorter: SorterResult<T>
	) => void;
	loading?: boolean;
	selectedRowKeys?: React.Key[];
};

type TForm<T extends object = object> = {
	defaultValues?: Partial<T>;
	visible: boolean;
	onCancel: () => void;
	btnAddTitle?: string;
	title?: string;
};
