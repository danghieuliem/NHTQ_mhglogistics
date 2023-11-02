import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { user } from "~/api";
import { DataTable } from "~/components";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

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
      responsive: ["md"],
      render: (_, __, index) => index + 1,
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
    {
      title: <>Số dư (VNĐ)</>,
      dataIndex: "Wallet",
      align: "right",
      render: (Wallet) => <span>{_format.getVND(Wallet, "")}</span>,
    },
    {
      title: "Mua hộ",
      dataIndex: "TotalMainOrder",
      align: "right",
      responsive: ["sm"],
    },
    {
      title: "Ký gửi",
      dataIndex: "TotalTransportationOrder",
      align: "right",
      responsive: ["sm"],
    },
    {
      title: "Thanh toán hộ",
      dataIndex: "TotalPayHelp",
      align: "right",
      responsive: ["sm"],
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data: data as TEmployee[],
        loading: isFetching,
        title: "Khách hàng có đơn hàng nhiều nhất",
      }}
    />
  );
};
