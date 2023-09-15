import React from "react";
import { useQuery } from "react-query";
import { historyOrderChange } from "~/api";
import { DataTable } from "~/components/globals/table";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

type TProps = {
  data: TOrder;
  loading: boolean;
};

export const OrderHistory: React.FC<TProps> = ({ data, loading }) => {

  const {data:  HistoryOrderChanges} = useQuery(
    ['history-order'],
    () => historyOrderChange.getList({
      MainOrderId: data?.Id,
      PageIndex: 1,
      PageSize: 999999,
      OrderBy: "Id desc"
    })
    .then(res => res?.Data?.Items),
    {
      enabled: !!data?.Id,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  );

  const paymentHistoryColumns: TColumnsType<TPayOrderHistory> = [
    {
      dataIndex: "Created",
      title: "Ngày thanh toán",
      render: (date) => _format.getVNDate(date),
      width: 200
    },
    {
      dataIndex: "CreatedBy",
      title: "Người Thực hiện",
      width: 160
    },
    {
      dataIndex: "StatusName",
      title: "Loại thanh toán",
      width: 160,
      render: (status, record) => {
        // let color = "orange";
        // if (category === 1) color = "blue";
        // return <Tag color={color}>{data?.categoryName}</Tag>;
        return status;
      },
    },
    {
      dataIndex: "TypeName",
      title: "Hình thức",
      width: 120
    },
    {
      dataIndex: "Amount",
      title: "Tiền thanh toán",
      align: "right",
      render: (money) => _format.getVND(money),
      width: 200
    },
  ];

  const changeHistoryColumns: TColumnsType<THistoryOrderChange> = [
    {
      dataIndex: "Created",
      title: "Ngày thay đổi",
      width: 200,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "CreatedBy",
      title: "Người thay đổi",
      width: 100,
    },
    {
      dataIndex: "UserGroupName",
      title: "Quyền hạn",
      width: 100,
    },
    {
      dataIndex: "HistoryContent",
      title: "Nội dung",
      width: 300,
    },
  ];

  const complainHistoryColumns: TColumnsType<TOrderComplain> = [
    {
      dataIndex: "Created",
      title: "Ngày khiếu nại",
      // width: 179,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "UpdatedBy",
      title: "Người duyệt",
      // width: 120,
    },
    {
      dataIndex: "Updated",
      title: "Ngày duyệt",
      // width: 110,
    },
    {
      dataIndex: "StatusName",
      title: "Trạng thái",
      // width: 110,
    },
    {
      dataIndex: "ComplainText",
      title: "Nội dung",
      // width: 110,
    },
  ];

  return (
    <React.Fragment>
      <DataTable
        title="Lịch sử thanh toán"
        columns={paymentHistoryColumns}
        data={data?.PayOrderHistories}
        style="detailOrder"
        className="mb-4"
        scroll={{y: 500}}
      />
      <DataTable
        title="Lịch sử thay đổi"
        columns={changeHistoryColumns}
        data={(HistoryOrderChanges as any)}
        style="detailOrder"
        scroll={{y: 600, x: 1200}}
        className="mb-4"
      />
      <DataTable
        title="Lịch sử khiếu nại"
        columns={complainHistoryColumns}
        data={data?.Complains}
        scroll={{y: 500, x: 1200}}
        style="detailOrder"
      />
    </React.Fragment>
  );
};
