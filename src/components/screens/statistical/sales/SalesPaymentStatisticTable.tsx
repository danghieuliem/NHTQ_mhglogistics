import React from "react";

import { DataTable } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils/index";

export const SalesPaymentStatisticTable = ({
	loading,
	pagination,
	handlePagination,
	data,
	exportExcel,
	RoleID,
}) => {
	const columns: TColumnsType<TStatisticalPayment> = [
		{
			dataIndex: "MainOrderId",
			title: "ID",
		},
		{
			dataIndex: "Created",
			title: "Ngày tạo",
			render: (date) => _format.getVNDate(date),
			responsive: ["lg"],
		},
		{
			dataIndex: "UserName",
			title: "Username",
			render: (_, record) => <>{record?.UserName ?? "--"}</>,
		},
		{
			dataIndex: "CreatedBy",
			title: "Người tạo",
			responsive: ["xl"],
		},
		{
			dataIndex: "Amount",
			title: "Số tiền",
			align: "right",
			render: (money) => _format.getVND(money, ""),
			responsive: ["md"],
		},
		{
			dataIndex: "StatusName",
			title: "Loại thanh toán",
			responsive: ["sm"],
		},
	];

	const expandable = {
		expandedRowRender: (data) => (
			<ul className="px-2 text-xs">
				<li className="sm:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Loại thanh toán:</span>
					{data.payment}
				</li>
				<li className="md:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Số tiền:</span>
					{data.money}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Ngày tạo:</span>
					{_format.getShortVNDate(data.created)}
				</li>
				<li className="lg:hidden justify-between flex py-2">
					<span className="font-medium mr-4">Người tạo:</span>
					{data.createdBy}
				</li>
			</ul>
		),
	};

	return (
		<React.Fragment>
			<div className="lg:flex items-end mb-4 justify-between">
				<h2 className="text-base font-bold py-2 uppercase">
					Thống kê thanh toán
				</h2>
				{
					(RoleID === 1 || RoleID === 3) &&
					<IconButton
						title="Xuất Thống Kê"
						btnIconClass="!mr-2"
						onClick={exportExcel}
						btnClass={"lg:mx-4"}
						icon="fas fa-file-export"
						showLoading
					/>
				}
			</div>
			<DataTable
				{...{
					columns,
					data,
					bordered: true,
					pagination,
					onChange: (pagination) => handlePagination(pagination),
					expandable: expandable,
					loading,
					scroll: {y: 600}
				}}
			/>
		</React.Fragment>
	);
};
