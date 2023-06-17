import { Tag } from "antd";
import Link from "next/link";
import { useQuery } from "react-query";
import { mainOrder } from "~/api";
import { orderStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { ActionButton, DataTable, showToast } from "../..";
import React from "react";

export const NewOrders = React.memo(() => {
  const { data, isFetching, isLoading } = useQuery(
    [
      "orderList",
      {
        PageIndex: 1,
        PageSize: 10,
        Status: 0,
        OrderBy: "Created desc",
      },
    ],
    () =>
      mainOrder
        .getList({
          PageIndex: 1,
          PageSize: 10,
          Status: 0,
          OrderBy: "Created desc",
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
  const columns: TColumnsType<TNewOrders> = [
    {
      title: "ID đơn",
      dataIndex: "Id",
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: "Loại đơn hàng",
      dataIndex: "OrderTypeName",
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status, _) => {
        const color = orderStatus.find((x) => x.id === status);
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
        <Link href={`/manager/order/order-list/detail/?id=${record?.Id}`}>
          <a>
            <ActionButton
              onClick={undefined}
              icon="far fa-info-square"
              title="Chi tiết"
            />
          </a>
        </Link>
      ),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (data) => (
  //     <ul className="px-2 text-xs">
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Loại đơn hàng:</span>
  //         {data?.OrderTypeName}
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <Tag color="red">{data?.StatusName}</Tag>
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>
  //         <Link href={`/manager/order/order-list/${data?.Id}`}>
  //           <a>
  //             <i className=" text-orange text-base fas fa-eye"></i>
  //           </a>
  //         </Link>
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <div className="tableBox">
      <DataTable
        {...{
          columns,
          data,
          loading: isFetching,
          style: "secondary",
          title: "Đơn mua hộ mới",
          // expandable: expandable,
        }}
      />
    </div>
  );
})
