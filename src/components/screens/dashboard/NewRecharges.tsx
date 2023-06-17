import { Tag } from "antd";
import { useQuery } from "react-query";
import { adminSendUserWallet } from "~/api";
import { showToast } from "~/components";
import { moneyStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { DataTable } from "../..";
import React from "react";

export const NewRecharges = React.memo(() => {
  const {
    data: userRechargeData,
    isFetching,
    isLoading,
  } = useQuery(
    [
      "clientRechargeData",
      {
        OrderBy: "Created desc",
        PageIndex: 1,
        PageSize: 10,
      },
    ],
    () =>
      adminSendUserWallet
        .getList({
          OrderBy: "Created desc",
          PageIndex: 1,
          PageSize: 10,
        })
        .then((data) => data?.Data?.Items),
    {
      onError: (error) =>
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
    }
  );
  
  const columns: TColumnsType<TNewRecharge> = [
    {
      title: "STT",
      dataIndex: "Id",
      render: (_, __, index) => ++index,
    },
    {
      title: "Ngày giờ",
      dataIndex: "Created",
      render: (created) => {
        return (
          <>
            <div>{_format.getVNDate(created)}</div>
          </>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: "Số tiền nạp",
      dataIndex: "Amount",
      align: "right",
      render: (Amount) => _format.getVND(Amount, ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status, _) => {
        const color = moneyStatus.find((x) => x.id === status);
        return (
          <Tag color={color?.color} key={status}>
            {_.StatusName}
          </Tag>
        );
      },
    },
  ];

  // const expandable = {
  // 	expandedRowRender: (data) => (
  // 		<ul className="px-2 text-xs">
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Ngày giờ:</span>
  // 				{_format.getVNDate(data?.Created)}
  // 			</li>
  // 			<li className="md:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Trạng thái:</span>
  // 				<Tag color={data?.status === 1 ? "green" : "orange"}>{data?.StatusName}</Tag>
  // 			</li>
  // 			<li className="lg:hidden justify-between flex py-2">
  // 				<span className="font-medium mr-4">Thao tác:</span>
  // 				<Link href="/money/recharge-history">
  // 					<a>
  // 						<i className=" text-orange text-base far fa-info-square"></i>
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
          data: userRechargeData,
          style: "secondary",
          loading: isFetching,
          title: "Khách hàng mới nạp tiền",
          // expandable: expandable,
          href: "/money/recharge-history",
        }}
      />
    </div>
  );
});
