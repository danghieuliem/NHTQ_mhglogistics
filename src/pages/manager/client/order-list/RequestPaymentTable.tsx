import { Tag } from "antd";
import React from "react";
import { DataTable } from "~/components";
import { paymentData } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

const RequestPaymentTable: React.FC<TTable<TRequestPaymentOrder>> = ({
	data,
	handlePagination,
	pagination,
	loading,
}) => {
	const columns: TColumnsType<TRequestPaymentOrder> = [
		{
			dataIndex: "Id",
			title: "ID",
			align: "center",
			sorter: true,
		},
		{
			dataIndex: "TotalPrice",
			title: "Tổng tiền (¥)",
			align: "center",
			render: (money) => _format.getVND(money, " "),
			responsive: ["sm"],
		},
		{
			dataIndex: "TotalPriceVND",
			title: "Tổng tiền (VNĐ)",
			align: "center",
			render: (money) => _format.getVND(money, " "),
			responsive: ["md"],
		},
		{
			dataIndex: "Currency",
			title: "Tỷ giá",
			align: "center",
			responsive: ["md"],
		},
		{
			dataIndex: "Created",
			title: "Ngày tạo",
			align: "center",
			render: (date) => _format.getShortVNDate(date),
			responsive: ["xl"],
		},
		{
			dataIndex: "Status",
			title: "Trạng thái",
			align: "center",
			sorter: true,
			render: (status, record) => {
				let color = "green";
				if (status === 1) {
					color = "orange";
				} else if (status === 2) {
					color = "blue";
				} else if (status === 3) {
					color = "red";
				}
				return <Tag color={color}>{record?.StatusName}</Tag>;
			},
			responsive: ["xl"],
		},
	];

	const expandable = {
		expandedRowRender: (record) => (
			<ul className="px-2 text-xs">
				<li className="sm:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng tiền (tệ):</span>
					{_format.getVND(record.TotalPrice)}
				</li>
				<li className="md:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tổng tiền (vnđ):</span>
					{_format.getVND(record.TotalPriceVND)}
				</li>
				<li className="md:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Tỷ giá:</span>
					{record.Currency}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Chưa hoàn thiện:</span>
					{record.isComplete ? (
						<i className="fad fa-check text-2xl text-green"></i>
					) : (
						<i className="far fa-times text-2xl text-red"></i>
					)}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Ngày tạo:</span>
					{_format.getVNDate(record.Created)}
				</li>
				<li className="xl:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Trạng thái:</span>
					<Tag color={paymentData[record.Status].color}>
						{paymentData[record.Status].name}
					</Tag>
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

export default RequestPaymentTable;