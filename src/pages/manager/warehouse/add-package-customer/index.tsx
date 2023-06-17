import React from 'react';
import { Layout, AddPackageCustomerForm } from '~/components';
import { breadcrumb } from '~/configs';
import { SEOConfigs } from '~/configs/SEOConfigs';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	return (
		<div className="tableBox">
			<AddPackageCustomerForm />
		</div>
	);
};

Index.displayName = SEOConfigs.assignPro;
Index.breadcrumb = breadcrumb.warehouse.addPackageCustomer;
Index.Layout = Layout;

export default Index;
