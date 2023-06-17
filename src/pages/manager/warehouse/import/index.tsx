import React from 'react';
import { Layout, ImportForm } from '~/components';
import { breadcrumb } from '~/configs';
import { SEOConfigs } from '~/configs/SEOConfigs';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	return (
		<div className="tableBox">
			<p className='text-red italic pb-3 '>* Vui lòng import đúng file mẫu, tránh tình trạng lỗi dữ liệu khách hàng</p>
			<ImportForm />
		</div>
	);
};

Index.displayName = SEOConfigs.importWarehouseTQ;
Index.breadcrumb = breadcrumb.warehouse.import;
Index.Layout = Layout;

export default Index;
