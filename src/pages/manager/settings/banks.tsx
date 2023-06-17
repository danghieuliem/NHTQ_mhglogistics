import {TablePaginationConfig} from "antd";
import {useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {bank} from "~/api/bank";
import {BanksForm, BanksTable, IconButton, Layout, toast} from "~/components";
import {breadcrumb} from "~/configs";
import {defaultPagination} from "~/configs/appConfigs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {selectUser, useAppSelector} from "~/store";
import {TNextPageWithLayout} from "~/types/layout";
import {TModalType} from "~/types/table";

const Index: TNextPageWithLayout = () => {
	const {user} = useAppSelector(selectUser);

	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination);

	const {isFetching, data, isLoading} = useQuery(
		["bankList", {Current: pagination.current, PageSize: pagination.pageSize}],
		() =>
			bank
				.getList({
					PageIndex: pagination.current,
					PageSize: pagination.pageSize,
				})
				.then((res) => res.Data),
		{
			keepPreviousData: true,
			onSuccess: (data) => setPagination({...pagination, total: data?.TotalItem}),
			onError: toast.error,
			enabled: user?.UserGroupId === 1,
		}
	);

	// delete item
	const queryClient = useQueryClient();
	const mutationDelete = useMutation((data: TBank) => bank.delete(data.Id), {
		// refresh item + table data after updating successfully
		onSuccess: () => {
			setModal(false);
			queryClient.invalidateQueries("bankList");
			toast.success("Xoá thành công");
		},
		onError: toast.error,
	});

	const [modal, setModal] = useState(false);
	const type = useRef<TModalType>("add");
	const item = useRef<TBank>();
	const handleModal = (itemSelected?: TBank, typeSelected: TModalType = "add") => {
		item.current = itemSelected;
		type.current = typeSelected;
		setModal(!modal);
	};

	return (
		<>
			<div className="tableBox">
				<div className="text-right mb-4">
					<IconButton
						onClick={() => handleModal()}
						icon="far fa-plus"
						title="Thêm ngân hàng"
						showLoading
						toolip=""
						btnClass="!iconGreen"
					/>
				</div>
				<BanksTable
					{...{
						loading: isFetching || mutationDelete.isLoading,
						data: data?.Items,
						handleModal,
						handleDelete: (data) => mutationDelete.mutate(data),
						pagination,
						handlePagination: (pagination) => setPagination(pagination),
						handleConfirm: () => mutationDelete.mutate(item.current),
					}}
				/>
				{/* <ModalDelete
				{...{
					id: item.current?.Id,
					visible: modal && type.current === 'delete',
					onCancel: () => setModal(false)
				}}
			/> */}
			</div>
			<BanksForm
				{...{
					onCancel: () => setModal(false),
					defaultValues: item.current,
					visible: modal && type.current !== "delete",
					title: type.current === "add" && "Thêm ngân hàng",
					btnAddTitle: type.current === "add" ? "Thêm mới" : "Cập nhật",
				}}
			/>
		</>
	);
};

Index.displayName = SEOConfigs?.settings?.listBank;
Index.breadcrumb = breadcrumb.settings.bank;
Index.Layout = Layout;

export default Index;
