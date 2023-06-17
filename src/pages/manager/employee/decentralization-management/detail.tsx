import React from 'react';
import { useQuery } from 'react-query';
import { permitObject } from '~/api';
import { ApiPermissionsTable, Layout, toast } from '~/components';
import { breadcrumb } from '~/configs';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	const { data: allApis, isLoading } = useQuery(
		'get-all-api-permissions',
		() =>
			permitObject
				.getList({ PageIndex: 0, PageSize: 0 })
				.then((res) => res?.Data?.Items),
		{
			onError: toast.error,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false
		}
	);
	return (
		<div className="tableBox">
			<ApiPermissionsTable allApis={allApis} isLoadingAllApis={isLoading} />
		</div>
	);
};

Index.breadcrumb = breadcrumb.employee.decentralization;
Index.Layout = Layout;

export default Index;
