import { useQuery } from "react-query";
import { user } from "~/api";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { DataTable, showToast } from "../..";

export const TheMostOrders = () => {
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
          OrderBy: "TotalMainOrder desc",
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

  const columns: TColumnsType<TTheMostOrders> = [
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
      title: "Số dư (VNĐ)",
      dataIndex: "Wallet",
      align: "right",
      render: (Wallet) => <span>{_format.getVND(Wallet, "")}</span>
    },
    {
      title: "Mua hộ",
      dataIndex: "TotalMainOrder",
      align: "right",
      render: (_, record) => <span>{_format.getVND(record?.TotalMainOrder, " ")}</span>
    },
    {
      title: "Ký gửi",
      dataIndex: "TotalTransportationOrder",
      align: "right",
      render: (_, record) =>
        <span>{_format.getVND(record?.TotalTransportationOrder, " ")}</span>
    },
    {
      title: "Thanh toán hộ",
      dataIndex: "TotalPayHelp",
      align: "right",
      render: (_, record) => <span>{_format.getVND(record?.TotalPayHelp, " ")}</span>
    },
    // {
    //   title: "Tổng đơn",
    //   dataIndex: "TotalMainOrder",
    //   align: "right",
    //   render: (_, record) => _format.getVND(record?.TotalMainOrder, " "),
    // },
  ];

  return (
    <DataTable
      {...{
        columns,
        data: data?.sort((a, b) => b?.TotalMainOrder - a?.TotalMainOrder),
        loading: isFetching,
        title: "Khách hàng có đơn hàng nhiều nhất",
        // expandable: expandable,
      }}
    />
  );
};
