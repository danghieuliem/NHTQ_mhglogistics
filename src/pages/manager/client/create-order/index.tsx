import {useRouter} from "next/router";
import React from "react";
import {useQuery} from "react-query";
import {user} from "~/api";
import {Layout, ClientCreateOrderForm, Empty} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {query} = useRouter();
	const {data, isError} = useQuery(["clientData", +query?.id], () => user.getByID(+query?.id), {
		select: (data) => data.Data,
		retry: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		enabled: !!query?.id,
	});

	if (isError) return <Empty description={`Không tìm thấy nhân viên #${query?.id}`} />;

	return (
		<div className="tableBox">
			<ClientCreateOrderForm userData={data} />
		</div>
	);
};
export default Index;

Index.displayName = SEOConfigs.oder.createdOder;
Index.breadcrumb = breadcrumb.client.createOrder.detail;
Index.Layout = Layout;
