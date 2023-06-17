import { Tag } from "antd";
import Link from "next/link";
import { useQuery } from "react-query";
import { payHelp } from "~/api";
import { paymentStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { ActionButton, DataTable, showToast } from "../..";
import React from "react";

export const NewPaymentOrders = React.memo(() => {
  const { isFetching, data, isLoading } = useQuery(
    [
      "requestPaymentData",
      {
        PageCurrent: 1,
        PageSize: 10,
        OrderBy: "",
        Status: 1,
      },
    ],
    () =>
      payHelp
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "",
          Status: 1,
        })
        .then((res) => res.Data.Items),
    {
      keepPreviousData: true,
      onError: (error) =>
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
    }
  );

  const columns: TColumnsType<TNewPaymentOrders> = [
    {
      title: "ID",
      dataIndex: "Id",
      render: (_, __, index) => ++index,
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: "Tổng tiền (¥)",
      dataIndex: "TotalPrice",
      align: "right",
      render: (TotalPrice) => _format.getVND(TotalPrice, ""),
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "TotalPriceVND",
      align: "right",
      render: (TotalPriceVND) => _format.getVND(TotalPriceVND, ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status, _) => {
        const color = paymentStatus.find((x) => x.id === status);
        return (
          <Tag color={color?.color} key={status}>
            {_.StatusName}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "right",
      render: (_, record) => (
        <Link href={`/manager/order/request-payment/detail/?id=${record?.Id}`}>
          <a>
            <ActionButton
              onClick={undefined}
              icon="far fa-info-square"
              title="Đến chi tiết"
            />
          </a>
        </Link>
      ),
    },
  ];

  // const expandable = {
  // 	expandedRowRender: (data) => (
  // 		<ul className="px-2 text-xs">
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Tổng tiền (VNĐ):</span>
  // 				{data?.TotalPrice}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Trạng thái:</span>
  // 				<Tag color="red">{data?.StatusName}</Tag>
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Thao tác:</span>
  // 				<Link href={`/manager/order/request-payment/detail/?id=${data?.Id}`}>
  // 					<a>
  // 						<i className=" text-orange text-base fas fa-edit"></i>
  // 					</a>
  // 				</Link>
  // 			</li>
  // 		</ul>
  // 	),
  // };

  return (
    <div className="tableBox">
      <DataTable
        {...{
          columns,
          data,
          loading: isFetching,
          style: "secondary",
          title: "Đơn thanh toán hộ mới",
          // expandable: expandable,
        }}
      />
    </div>
  );
})
