import React from 'react';
import { Layout, CheckWarehouseChinaForm } from '~/components';
import { breadcrumb } from '~/configs';
import { SEOConfigs } from '~/configs/SEOConfigs';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	return (
		<div className="tableBox ">
			<CheckWarehouseChinaForm />
		</div>
	);
};

Index.displayName = SEOConfigs.checkWarehouseTQ;
Index.breadcrumb = breadcrumb.warehouse.checkWarehouseTQ;
Index.Layout = Layout;

export default Index;
