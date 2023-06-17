import { Tag } from "antd";
import Link from "next/link";
import { useQuery } from "react-query";
import { transportationOrder } from "~/api";
import { transportStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { ActionButton, DataTable, showToast } from "../..";
import React from "react";

export const NewDeliveryOrders = React.memo(() => {
  const { isFetching, data, isLoading } = useQuery(
    [
      "deliveryOrder",
      {
        Current: 1,
        PageSize: 10,
        Status: 2,
        OrderBy: "Id desc",
      },
    ],
    () =>
      transportationOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "Id desc",
          Status: 2,
        })
        .then((res) => res?.Data?.Items),
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

  const columns: TColumnsType<TNewDeliveryOrders> = [
    {
      title: "ID",
      dataIndex: "Id",
      render: (_, __, index) => ++index,
    },
    {
      title: "Khách hàng",
      dataIndex: "UserName",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "OrderTransactionCode",
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status, _) => {
        const color = transportStatus.find((x) => x.id === status);
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
        <Link href={`/manager/deposit/deposit-list/detail/?id=${record?.Id}`}>
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
  // 				<span className="font-medium mr-4">Mã đơn hàng:</span>
  // 				{data?.OrderTransactionCode}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Trạng thái:</span>
  // 				<Tag color="red" key={data?.Status}>
  // 					{data?.StatusName}
  // 				</Tag>
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Thao tác:</span>
  // 				<Link href={`/manager/deposit/deposit-list/${data?.Id}`}>
  // 					<a>
  // 						<ActionButton onClick={undefined} icon="fas fa-edit" title="Cập nhật" />
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
          title: "Đơn ký gửi mới",
          // expandable: expandable,
        }}
      />
    </div>
  );
})
