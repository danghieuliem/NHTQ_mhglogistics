import { Popconfirm, Space, Tag } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
	EExportStatusData,
	EPaymentData, exportStatusData,
	paymentData
} from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import { DepositStatisticNote } from "./DepositStatisticNote";

export const DepositStatisticTable: React.FC<
	TTable<TUserStatisticalDeposit> & {
		onPayment: (data: TUserStatisticalDepositUpdateStatus) => Promise<unknown>;
		onUpdateNote: (data: TUserStatisticalDepositUpdateNote) => Promise<unknown>;
	}
> = ({
	data,
	handlePagination,
	pagination,
	loading,
	onPayment,
	onUpdateNote,
}) => {
	const columns: TColumnsType<TUserStatisticalDeposit> = [
		{
			dataIndex: "Id",
			title: "ID",
			align: "center",
			responsive: ["sm"],
		},
		{
			dataIndex: "UserName",
			title: "Tên tài khoản",
			align: "center",
		},
		{
			dataIndex: "Created",
			title: "Ngày YCXK",
			align: "center",
			responsive: ["sm"],
			render: (date) => date && _format.getVNDate(date),
		},
		{
			dataIndex: "BarCodeAndDateOuts",
			title: () => <div className="text-center">Ngày XK</div>,
			render: (record) =>
				record.map((item) => (
					<div className="flex mb-2">
						{item?.OrderTransactionCode !== "" && (
							<div className="w-[140px]">
								<p className="text-[#777676] font-medium text-xs">mã vận đơn</p>
								<div className="text-xs text-[#777676] bg-[#0000000a] p-1 mr-2 rounded-md">
									{item?.OrderTransactionCode}
								</div>
							</div>
						)}
						{item?.DateOutWarehouse !== "" && (
							<div className="w-[140px]">
								<p className="text-[#777676] font-medium text-xs">ngày xk</p>
								<div className="text-xs text-[#777676] bg-[#0000000a] p-1 mr-2 rounded-md">
									{_format.getShortVNDate(item?.DateOutWarehouse)}
								</div>
							</div>
						)}
					</div>
				)),
			responsive: ["md"],
		},
		{
			dataIndex: "TotalPackage",
			title: "Tổng số kiện",
			align: "center",
			responsive: ["lg"],
			render: (money) => money && _format.getVND(money, ""),
		},
		{
			dataIndex: "TotalWeight",
			title: "Tổng số KG",
			align: "center",
			responsive: ["lg"],
			render: (money) => money && _format.getVND(money, ""),
		},
		{
			dataIndex: "TotalPriceVND",
			title: "Tổng cước",
			align: "center",
			responsive: ["xl"],
			render: (money) => money && _format.getVND(money),
		},
		{
			dataIndex: "ShippingTypeInVNName",
			title: "HTVC",
			align: "center",
			responsive: ["xl"],
		},
		{
			dataIndex: "StatusExport",
			title: "Trạng thái thanh toán",
			align: "center",
			render: (status, record) => {
				return (
					<Tag color={paymentData?.[record.Status]?.color}>
						{record.StatusName}
					</Tag>
				);
			},
			responsive: ["xl"],
		},
		{
			dataIndex: "StatusExport",
			title: "Trạng thái",
			align: "center",
			render: (status, record) => {
				return (
					<Tag color={exportStatusData?.[record.StatusExport - 1]?.color}>
						{record.StatusExportName}
					</Tag>
				);
			},
			responsive: ["xl"],
		},
		{
			dataIndex: "StaffNote",
			title: "Ghi chú",
			align: "center",
			render: (note, {Id, StaffNote}) => (
				<DepositStatisticNote
					name={Id.toString()}
					defaultValue={StaffNote}
					onClick={(StaffNote: string) => onUpdateNote({Id, StaffNote})}
				/>
			),
			responsive: ["xl"],
		},
		{
			dataIndex: "action",
			title: "Thao tác",
			align: "right",
			render: (_, record) => (
				<Space>
					{record.Status === EPaymentData.Unpaid &&
					record.StatusExport === EExportStatusData.Unexport ? (
						<React.Fragment>
							<Popconfirm
								title="Bạn có muốn thanh toán bằng ví?"
								placement="leftBottom"
								onConfirm={() =>
									onPayment({
										Id: record.Id,
										IsPaymentWallet: true,
										Status: 2,
									})
								}
							>
								<ActionButton
									icon="fal fa-credit-card"
									title="Thanh toán bằng ví"
								/>
							</Popconfirm>
							<Popconfirm
								placement="leftBottom"
								title="Bạn có muốn thanh toán trực tiếp?"
								onConfirm={() =>
									onPayment({
										Id: record.Id,
										IsPaymentWallet: false,
										Status: 2,
									})
								}
							>
								<ActionButton
									icon="fas fa-money-bill-wave"
									title="Thanh toán trực tiếp"
								/>
							</Popconfirm>
							<Popconfirm
								placement="leftBottom"
								title="Bạn có muốn huỷ thống kê?"
								onConfirm={() =>
									onPayment({
										Id: record.Id,
										IsPaymentWallet: false,
										Status: 3,
									})
								}
							>
								<ActionButton icon="fas fa-trash" title="Hủy thống kê" />
							</Popconfirm>
						</React.Fragment>
					) : (
						<ActionButton
							onClick={undefined}
							icon="fad fa-shredder"
							title="In phiếu"
						/>
					)}
				</Space>
			),
			responsive: ["xl"],
		},
	];

	const expandable = {
		expandedRowRender: (record, note, index) => (
			<ul className="px-2 text-xs">
				<li className="sm:hidden justify-between flex py-2">
					<span className="font-medium mr-4">ID:</span>
					{record.Id}
				</li>
				<li className="sm:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Ngày YCXK:</span>
					{record.OutStockDate}
				</li>
				<li className="md:hidden justify-between py-2">
					<span className="font-medium mr-4">Ngày XK:</span>
					<div className="flex mt-2 justify-end">
						<div>
							<p className="text-black font-medium">Mã vận đơn</p>
							<div className="text-sm text-black bg-[#0000000a] p-2 mr-2 rounded-3xl">
								89728947329847832
							</div>
						</div>
						<div>
							<p className="text-black font-medium">Ngày XK</p>
							<div className="text-sm text-black bg-[#0000000a] p-2 rounded-3xl">
								04/01/2022
							</div>
						</div>
					</div>
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng số kiện:</span>
					{record.TotalPackage}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng số kg:</span>
					{record.TotalWeight}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng cước:</span>
					{record.TotalPriceVND}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">HTVC:</span>
					{record.ShippingTypeInVNName}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Trạng thái thanh toán:</span>
					<Tag
						color={exportStatusData.find((x) => x.id === record.Status)?.color}
					>
						{exportStatusData.find((x) => x.id === record.Status)?.name}
					</Tag>
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Trạng thái:</span>
					<Tag
						color={exportStatusData.find((x) => x.id === record.Status)?.color}
					>
						{exportStatusData.find((x) => x.id === record.Status)?.name}
					</Tag>
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Ghi chú:</span>
					<div className="flex flex-col">
						<TextArea
							className="border border-black block rounded-sm p-1"
							id={note}
							name={note}
							rows={2}
						/>
						<IconButton
							onClick={() => console.log(record.id, note)}
							btnIconClass={"mt-4"}
							icon={"fas fa-edit"}
							title={"Cập nhật"}
							showLoading
							toolip=""
						/>
					</div>
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Thao tác:</span>
					<Space>
						{index > 0 ? (
							<React.Fragment>
								<ActionButton
									onClick={undefined}
									icon="fal fa-credit-card"
									title="Thanh toán bằng ví"
								/>
								<ActionButton
									onClick={undefined}
									icon="fas fa-money-bill-wave"
									title="Thanh toán trực tiếp"
								/>
								<ActionButton
									onClick={undefined}
									icon="fas fa-trash"
									title="Hủy thống kê"
								/>
							</React.Fragment>
						) : (
							<ActionButton
								onClick={undefined}
								icon="fal fa-credit-card"
								title="In phiếu"
							/>
						)}
					</Space>
				</li>
			</ul>
		),
	};

	return (
		<DataTable
			{...{
				loading,
				columns,
				data,
				bordered: true,
				pagination,
				onChange: handlePagination,
				expandable: expandable,
			}}
		/>
	);
};
