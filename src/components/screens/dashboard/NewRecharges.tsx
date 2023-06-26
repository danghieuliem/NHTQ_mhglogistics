import React from "react";
import { useQuery } from "react-query";
import { adminSendUserWallet } from "~/api";
import { showToast } from "~/components";
import { moneyStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { DataTable } from "../..";
import TagStatus from "../status/TagStatus";

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
    // {
    //   title: "STT",
    //   dataIndex: "Id",
    //   render: (_, __, index) => ++index,
    // },
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
        return <TagStatus color={color?.color} statusName={_.StatusName} />;
      },
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data: userRechargeData,
        style: "secondary",
        loading: isFetching,
        title: "Khách hàng mới nạp tiền",
        // expandable: expandable,
      }}
    />
  );
});
