import Link from "next/link";
import { useQuery } from "react-query";
import { user } from "~/api";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { ActionButton, DataTable, showToast, toast } from "../..";
import React from "react";

export const TheMostBalance = React.memo(() => {
  const { isFetching, data, isLoading } = useQuery(
    [
      "clientData",
      {
        Current: 1,
        PageSize: 10,
      },
    ],
    () =>
      user
        .getList({
          PageIndex: 1,
          PageSize: 10,
          OrderBy: "SumAmount desc",
          UserGroupId: 2,
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
  const columns: TColumnsType<TTheMostBalance> = [
    {
      title: "STT",
      dataIndex: "Id",
      align: "center",
      render: (_, __, index) => ++index,
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: "Số dư hiện tại",
      dataIndex: "Wallet",
      align: "right",
      render: (Wallet) => _format.getVND(Wallet, ""),
    },
    {
      title: "Tổng nạp",
      dataIndex: "SumAmount",
      align: "right",
      render: (SumAmount) => _format.getVND(SumAmount, ""),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: 'right',
      render: (_, record) => (
        <Link href={`/manager/client/transaction-history/?id=${record?.Id}`}>
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
  //   expandedRowRender: (data) => (
  //     <ul className="px-2 text-xs">
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Số dư hiện tại:</span>
  //         {data?.Wallet}
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Tổng nạp:</span>
  //         {data?.SumAmount}
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>
  //         <Link href={`/manager/client/transaction-history/${data?.Id}`}>
  //           <a>
  //             <ActionButton
  //               onClick={undefined}
  //               icon="fas fa-edit"
  //               title="Cập nhật"
  //             />
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
          title: "Khách hàng có số dư nhiều nhất",
          // expandable: expandable,
        }}
      />
    </div>
  );
})
