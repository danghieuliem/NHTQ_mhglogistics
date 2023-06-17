import { TablePaginationConfig } from 'antd';
import React from 'react';

type TProps = {
	bigPackageList: TPackage[];
	continueFetchAPI: boolean;
	totalPage: number;
	handleContinueFetchingAPI: (bool: boolean) => void;
	pagination: TablePaginationConfig;
	handlePagination: (pagination: TablePaginationConfig) => void;
	defaultValueBigPackage: number;
};

export const CheckWarehouseContext = React.createContext<Partial<TProps>>({});

export const CheckWarehouseContextContainer: React.FC<TProps> = ({ children, ...newProps }) => {
	return <CheckWarehouseContext.Provider value={newProps}>{children}</CheckWarehouseContext.Provider>;
};
