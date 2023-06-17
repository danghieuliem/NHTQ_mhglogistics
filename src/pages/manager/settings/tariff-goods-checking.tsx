import {TablePaginationConfig, Tabs} from "antd";
import {useRef, useState} from "react";
import {useQuery} from "react-query";
import {feeGoodsChecking} from "~/api";
import {Layout, TariffGoodsCheckingForm, TariffGoodsCheckingTable, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {defaultPagination} from "~/configs/appConfigs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {selectUser, useAppSelector} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";

const {TabPane} = Tabs;

const Index: TNextPageWithLayout = () => {
	const {user} = useAppSelector(selectUser);

	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);
	const [smallerTenCNY, setSmallerTenCNY] = useState([]);
	const [greaterTenCNY, setGreaterTenCNY] = useState([]);

	const {isFetching} = useQuery(
		["fee-goods-checking", {Current: pagination.current, PageSize: pagination.pageSize}],
		() =>
			feeGoodsChecking
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
					OrderBy: "Id desc",
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				const arr1 = data.Items.filter((item) => item?.RowNumber % 2 === 0);
				const arr2 = data.Items.filter((item) => item?.RowNumber % 2 !== 0);
				setGreaterTenCNY(arr1);
				setSmallerTenCNY(arr2);
				setPagination({...pagination, total: data.TotalItem});
			},
			onError: toast.error,
			enabled: user?.UserGroupId === 1,
		}
	);

	const [modal, setModal] = useState(false);
	const item = useRef<TTariffUser>();
	const handleModal = (itemSelected) => {
		item.current = itemSelected;
		setModal(!modal);
	};

	return (
		<div className="tableBox py-2 xl:grid xl:grid-cols-1 xl:gap-4">
			<div className="col-span-1">
				<Tabs>
					<TabPane tab={"Giá sản phẩm nhỏ hơn 10 ¥"} key="1">
						<div className="tableBoxNon mt-4">
							<TariffGoodsCheckingTable
								{...{
									loading: isFetching,
									data: smallerTenCNY,
									handleModal,
									pagination,
									handlePagination: (pagination) => setPagination(pagination),
								}}
							/>
						</div>
						<TariffGoodsCheckingForm
							{...{
								onCancel: () => setModal(false),
								defaultValues: item.current,
								visible: modal,
							}}
						/>
					</TabPane>

					<TabPane tab={"Giá sản phẩm lớn hơn 10 ¥"} key="2">
						<div className="tableBoxNon mt-4">
							<TariffGoodsCheckingTable
								{...{
									loading: isFetching,
									data: greaterTenCNY,
									handleModal,
									pagination,
									handlePagination: (pagination) => setPagination(pagination),
								}}
							/>
						</div>
						<TariffGoodsCheckingForm
							{...{
								onCancel: () => setModal(false),
								defaultValues: item.current,
								visible: modal,
							}}
						/>
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};
Index.displayName = SEOConfigs?.settings?.goodsChecking;
Index.breadcrumb = breadcrumb.settings.goodsChecking;
Index.Layout = Layout;

export default Index;
