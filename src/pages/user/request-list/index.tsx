import React, {useState} from "react";
import {useQuery} from "react-query";
import {payHelp} from "~/api";
import {showToast, UserLayout, UserRequestListTable} from "~/components";
import {SEOHomeConfigs} from "~/configs/SEOConfigs";
import {useAppSelector} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {current: newUser} = useAppSelector((state) => state.user);
	if (!newUser) return null;

	const [filter, setFilter] = useState({
		PageIndex: 1,
		PageSize: 20,
		TotalItems: null,
		OrderBy: "Id desc",
		UID: newUser?.UserId,
	});

	const handleFilter = (newFilter) => {
		setFilter({...filter, ...newFilter});
	};

	const {isFetching, data, refetch} = useQuery(
		["requestList", {...filter}],
		async () => await payHelp.getList(filter).then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) =>
				setFilter({...filter, TotalItems: data?.TotalItem, PageIndex: data?.PageIndex, PageSize: data?.PageSize}),
			onError: (error) => {
				showToast({
					title: "Đã xảy ra lỗi!",
					message: (error as any)?.response?.data?.ResultMessage,
					type: "error",
				});
			},
			enabled: !!newUser,
		}
	);

	return (
		<React.Fragment>
			{/* <div className="titlePageUser"></div> */}
			<div className="tableBox mt-6">
				<UserRequestListTable
					data={data?.Items}
					filter={filter}
					handleFilter={handleFilter}
					loading={isFetching}
					refetch={refetch}
				/>
			</div>
		</React.Fragment>
	);
};

Index.displayName = SEOHomeConfigs.payFor.listRequest;
Index.Layout = UserLayout;

export default Index;
