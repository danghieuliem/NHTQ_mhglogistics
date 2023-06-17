import React from 'react';
import { Layout, PrintPurchaseForm } from '~/components';
import { breadcrumb } from '~/configs';
import { SEOConfigs } from '~/configs/SEOConfigs';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	return (
		<div className="bg-white rounded-3xl p-8 mb-4 max-w-5xl">
			<PrintPurchaseForm />
		</div>
	);
};

Index.displayName = SEOConfigs.moneyManagement.detailPayExport;
Index.breadcrumb = breadcrumb.statistical.printPurchase.detail;
Index.Layout = Layout;

export default Index;
