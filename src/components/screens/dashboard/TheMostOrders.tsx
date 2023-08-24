import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { user } from "~/api";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import { DataTable } from "../..";

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
      staleTime: 10000,
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
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
      render: (Wallet) => <span>{_format.getVND(Wallet, "")}</span>,
    },
    {
      title: "Mua hộ",
      dataIndex: "TotalMainOrder",
      align: "right",
      render: (_, record) => (
        <span>{_format.getVND(record?.TotalMainOrder, " ")}</span>
      ),
    },
    {
      title: "Ký gửi",
      dataIndex: "TotalTransportationOrder",
      align: "right",
      render: (_, record) => (
        <span>{_format.getVND(record?.TotalTransportationOrder, " ")}</span>
      ),
    },
    {
      title: "Thanh toán hộ",
      dataIndex: "TotalPayHelp",
      align: "right",
      render: (_, record) => (
        <span>{_format.getVND(record?.TotalPayHelp, " ")}</span>
      ),
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
        data: data,
        loading: isFetching,
        title: "Khách hàng có đơn hàng nhiều nhất",
        // expandable: expandable,
      }}
    />
  );
};
