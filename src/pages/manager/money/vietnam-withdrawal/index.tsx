import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {user} from "~/api";
import {ChinaAndVietNamWithdrawalForm, Empty, Layout} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOHomeConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {query} = useRouter();
	const {
		data: userData,
		isLoading,
		isError,
	} = useQuery(["clientData", +query?.id], () => user.getByID(+query?.id), {
		select: (data) => data.Data,
		enabled: !!query?.id,
		retry: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	if (isError) return <Empty description={`Không tìm thấy nhân viên #${query?.id}`} />;

	return (
		<div className="tableBox">
			<ChinaAndVietNamWithdrawalForm page="vietnam" userData={userData} loading={isLoading} />
		</div>
	);
};

Index.displayName = SEOHomeConfigs.financialManagement.withdrawMoneyVND;
Index.breadcrumb = breadcrumb.money.vietnamWithdrawal.detail;
Index.Layout = Layout;

export default Index;
