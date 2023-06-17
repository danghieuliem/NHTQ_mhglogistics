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
      render: (Wallet) => _format.getVND(Wallet, ""),
    },
    {
      title: "Mua hộ",
      dataIndex: "TotalMainOrder",
      align: "right",
      render: (_, record) => _format.getVND(record?.TotalMainOrder, " "),
    },
    {
      title: "Ký gửi",
      dataIndex: "TotalTransportationOrder",
      align: "right",
      render: (_, record) =>
        _format.getVND(record?.TotalTransportationOrder, " "),
    },
    {
      title: "Thanh toán hộ",
      dataIndex: "TotalPayHelp",
      align: "right",
      render: (_, record) => _format.getVND(record?.TotalPayHelp, " "),
    },
    {
      title: "Tổng đơn",
      dataIndex: "TotalMainOrder",
      align: "right",
      render: (_, record) => _format.getVND(record?.TotalMainOrder, " "),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (data) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Số dư (VNĐ):</span>
  //         {data?.balance}
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Tổng đơn:</span>
  //         {data?.numOfOrders}
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Mua hộ:</span>
  //         {data?.numberOfPurchases}
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">VC hộ:</span>
  //         {data?.numberOfTranfers}
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">TT hộ:</span>
  //         {data?.numberOfPayments}
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <div className="tableBox">
      <DataTable
        {...{
          columns,
          data: data?.sort((a, b)=> b?.TotalMainOrder - a?.TotalMainOrder),
          style: "secondary",
          loading: isFetching,
          title: "Khách hàng có đơn hàng nhiều nhất",
          // expandable: expandable,
        }}
      />
    </div>
  );
};
