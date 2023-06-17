import {useRouter} from "next/router";
import {useState} from "react";
import {useQuery} from "react-query";
import {outStockSession} from "~/api";
import {Empty, Layout, OutstockPaymentDetail, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {query} = useRouter();
	const [user, setUser] = useState<{name: string; phone: string}>({
		name: null,
		phone: null,
	});

	const {data, isLoading, isFetching, isError, refetch} = useQuery(
		["clientWithdrawData", query?.id],
		() => outStockSession.getByID(+query?.id),
		{
			enabled: !!query?.id,
			onSuccess: (data) =>
				!user.name && !user.phone && setUser({name: data.Data?.UserName, phone: data.Data?.UserPhone}),
			onError: toast.error,
			refetchOnWindowFocus: false,
		}
	);

	if (isError) return <Empty description={`Không tìm thấy phiếu thanh toán xuất kho #${query?.id}`} />;

	return (
		<div className="">
			<OutstockPaymentDetail
				type="payment"
				data={[]}
				item={data?.Data}
				loading={isLoading}
				fetching={isFetching}
				user={user}
				handleUser={setUser}
				handleRefetch={refetch}
			/>
		</div>
	);
};

Index.displayName = SEOConfigs.moneyManagement.detailPayExport;
Index.breadcrumb = breadcrumb.money.outstockPayment.detail;
Index.Layout = Layout;

export default Index;
