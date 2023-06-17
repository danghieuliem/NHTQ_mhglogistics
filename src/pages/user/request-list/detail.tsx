import {useRouter} from "next/router";
import React from "react";
import {useQuery} from "react-query";
import {payHelp} from "~/api";
import {UserLayout, UserRequestListForm} from "~/components";
import {SEOHomeConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

type TProps = {
	data: TRequestPaymentOrder;
};

const Index: TNextPageWithLayout<TProps> = () => {
	const {query} = useRouter();

	const {data} = useQuery(["request-id"], () => payHelp.getByID(+query?.id), {
		onSuccess: (data) => data,
		enabled: !!+query?.id,
	});

	return (
		<React.Fragment>
			<div className="titlePageUser">CHI TIẾT THANH TOÁN HỘ #{data?.Data?.Id}</div>
			<UserRequestListForm data={data?.Data} />
		</React.Fragment>
	);
};

Index.displayName = SEOHomeConfigs.payFor.detaiPay;
Index.Layout = UserLayout;

export default Index;
