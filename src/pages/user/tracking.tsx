import {Empty, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import {smallPackage} from "~/api";
import {showToast, UserLayout} from "~/components";
import {TrackingDetail, TrackingFilter} from "~/components/screens/user/tracking";
import {SEOHomeConfigs} from "~/configs/SEOConfigs";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = ({connection}) => {
	const [TransactionCode, setTransactionCode] = useState<string>(null);
	const handleFilter = (TransactionCode: string) => setTransactionCode(TransactionCode.trim());

	// realtime
	// ===== begin =====
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();

	useEffect(() => {
		let timeout = null;

		if (connection) {
			connection.on("change", async (mainOrders: TOrder[]) => {
				if (!!mainOrders?.length) {
					let item = null;
					mainOrders.every((order) => {
						item = order?.SmallPackages?.find((smallPackage) => smallPackage?.OrderTransactionCode === TransactionCode);
						if (item) return false;
						return true;
					});

					if (item) {
						setLoading(true);
						await queryClient.setQueryData(["tracking", TransactionCode], {
							Data: [item],
						});
						timeout = setTimeout(() => setLoading(false), 2000);
					}
				}
			});
		}

		return () => clearTimeout(timeout);
	}, [connection, TransactionCode]);
	// ===== end =====

	const {data, isLoading} = useQuery(
		["tracking", TransactionCode],
		() => smallPackage.getByTransactionCode({TransactionCode}),
		{
			select: (data) => data.Data,
			enabled: !!TransactionCode?.length,
			refetchOnWindowFocus: false,
			retry: false,
			refetchOnReconnect: false,
			onError: (error) => {
				showToast({
					title: "Đã xảy ra lỗi!",
					message: (error as any)?.response?.data?.ResultMessage,
					type: "error",
				});
			},
		}
	);

	return (
		<React.Fragment>
			<h1 className="titlePageUser !mb-0">Tracking mã vận đơn</h1>
			<Spin spinning={isLoading || loading}>
				<div className="tableBox px-4 tracking">
					<div className="max-w-[600px] my-3 mx-auto">
						<TrackingFilter handleFilter={handleFilter} />
					</div>
					<div>
						{TransactionCode === null ? (
							<Empty description="Vui lòng nhập mã vận trước trước" />
						) : !TransactionCode.length || !data?.length ? (
							<Empty description="Không tìm thấy mã vận đơn này" />
						) : (
							<TrackingDetail data={data} />
						)}
					</div>
				</div>
			</Spin>
		</React.Fragment>
	);
};

Index.displayName = SEOHomeConfigs.tracking;
Index.Layout = UserLayout;

export default Index;
