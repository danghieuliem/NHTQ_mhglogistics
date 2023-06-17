import React from 'react';
import { Layout, OutStockFormDetail } from '~/components';
import { breadcrumb } from '~/configs';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	return <OutStockFormDetail />;
};

Index.breadcrumb = breadcrumb.warehouse.outstock.detail;
Index.Layout = Layout;

export default Index;
