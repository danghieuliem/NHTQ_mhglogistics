import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { warehouseFee } from "~/api/warehouse-fee";
import { Layout, TariffChinaVietNamFilter, TariffChinaVietNamForm, TariffChinaVietNamTable, toast } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import type { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
	const [modalAdd, setModalAdd] = useState(false);
	const [modalUpdate, setModalUpdate] = useState(false);
	const [idTarget, setIdTarget] = useState(null);

	const [filter, setFilter] = useState({
		PageIndex: 1,
		PageSize: 999999,
		OrderBy: "Id desc",
		WarehouseFromId: null,
		WarehouseId: null,
		ShippingTypeToWareHouseId: null,
		IsHelpMoving: null,
		TotalItems: null,
	});

	const handleFilter = (newFilter) => {
		setFilter({...filter, ...newFilter});
	};

	const {isFetching, data, isLoading, refetch} = useQuery(
		["warehouseFeeData", {...filter}],
		() => warehouseFee.getList(filter),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			staleTime: 5000,
			onSuccess: (data) => {
				setFilter({
					...filter,
					TotalItems: data?.Data?.TotalItem,
					PageIndex: data?.Data?.PageIndex,
					PageSize: data?.Data?.PageSize,
				});
				return data?.Data?.Items;
			},
			enabled: userCurrentInfo?.UserGroupId === 1,
			onError: toast.error,
		}
	);

	return (
		<div className="">
			<TariffChinaVietNamFilter
				handleFilter={(newFilter) => handleFilter({...newFilter, PageIndex: 1})}
				handleAddStaff={() => setModalAdd(true)}
			/>
			<TariffChinaVietNamTable
				{...{
					loading: isFetching,
					data: data?.Data?.Items,
					handleGetID: (id: number) => setIdTarget(id),
					handleUpdate: () => setModalUpdate(true),
					filter,
					handleFilter,
				}}
				refetch={refetch}
			/>

			<TariffChinaVietNamForm
				{...{
					title: "Cập nhật phí vận chuyển TQ - VN",
					onCancel: () => setModalUpdate(false),
					defaultValues: data?.Data?.Items,
					visible: modalUpdate,
					idTarget,
				}}
				refetch={refetch}
				type={"update"}
			/>

			<TariffChinaVietNamForm
				{...{
					title: "Thêm phí vận chuyển TQ - VN",
					onCancel: () => setModalAdd(false),
					// defaultValues: {},
					visible: modalAdd,
				}}
				refetch={refetch}
				type={"addNew"}
			/>
		</div>
	);
};
Index.displayName = SEOConfigs?.settings.feeTQVN;
Index.breadcrumb = breadcrumb.settings.tariffChinaVietNam;
Index.Layout = Layout;

export default Index;
