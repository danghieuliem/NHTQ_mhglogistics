import {Tag} from "antd";
import React from "react";
import {ActionButton, DataTable} from "~/components";
import {smallPackageStatusData} from "~/configs/appConfigs";
import {TColumnsType, TTable} from "~/types/table";
import {_format} from "~/utils";

export const MissingPackageTable: React.FC<TTable<TSmallPackage>> = ({
	data,
	handleModal,
	handlePagination,
	pagination,
	loading,
}) => {
	const columns: TColumnsType<TSmallPackage> = [
		{
			dataIndex: "Id",
			title: "ID",
			align: "center",
		},
		{
			dataIndex: "Code",
			title: "Bao hàng",
			align: "center",
			responsive: ["sm"],
		},
		{
			dataIndex: "OrderTransactionCode",
			title: "Mã vận đơn",
			align: "center",
		},
		{
			dataIndex: "MainOrderCode",
			title: "Mã đơn hàng",
			align: "center",
			responsive: ["md"],
		},
		{
			dataIndex: "ProductType",
			title: "Loại hàng",
			align: "center",
			responsive: ["md"],
		},
		{
			dataIndex: "FeeShip",
			title: "Phí ship tệ",
			align: "center",
			responsive: ["lg"],
		},
		{
			dataIndex: "Weight",
			title: "Cân nặng kg",
			align: "center",
			responsive: ["lg"],
		},
		{
			dataIndex: "Volume",
			title: "Khối m3",
			align: "center",
			responsive: ["lg"],
		},
		{
			dataIndex: "Status",
			title: "Trạng thái",
			align: "center",
			render: (status, record) => (
				<Tag color={smallPackageStatusData.find((x) => x.id === status).color}>
					{record.StatusName}
				</Tag>
			),
			responsive: ["xl"],
		},
		{
			dataIndex: "Created",
			title: "Ngày tạo",
			align: "center",
			render: (date) => date && _format.getVNDate(date),
			responsive: ["xl"],
		},
		{
			dataIndex: "action",
			title: "Thao tác",
			align: "right",
			render: (_, record) => (
				<ActionButton
					onClick={() => handleModal(record)}
					icon="fas fa-edit"
					title="Cập nhật"
				/>
			),
			responsive: ["xl"],
		},
	];

	const expandable = {
		expandedRowRender: (record) => (
			<ul className="px-2 text-xs">
				<li className="sm:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Bao hàng:</span>
					{record.Code}
				</li>
				<li className="md:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Mã đơn hàng:</span>
					{record.MainOrderCode}
				</li>
				<li className="md:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Loại hàng:</span>
					{record.ProductType}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Phí ship tệ:</span>
					{record.FeeShip}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Cân (KG):</span>
					{record.Weight}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Khối (M3):</span>
					{record.Volume}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Trạng thái:</span>
					<Tag
						color={
							smallPackageStatusData.find((x) => x.id === record.Status).color
						}
					>
						{record.StatusName}
					</Tag>
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Ngày tạo:</span>
					{_format.getVNDate(record.Created)}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Thao tác:</span>
					<ActionButton
						onClick={() => handleModal(record)}
						icon="fas fa-edit"
						title="Cập nhật"
					/>
				</li>
			</ul>
		),
	};

	return (
		<DataTable
			{...{
				columns,
				data,
				loading,
				bordered: true,
				pagination,
				onChange: handlePagination,
				expandable: expandable,
			}}
		/>
	);
};
