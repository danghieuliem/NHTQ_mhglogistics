import { Pagination, Tag } from "antd";
import router from "next/router";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

type TProps = {
  filter;
  handleFilter: (newFilter) => void;
};

const OutStockPaymentTable: React.FC<TTable<TOutStockSession> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
}) => {
  const columns: TColumnsType<TOutStockSession> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "UserName",
      title: "Username",
      render: (_, record) => <>{record?.UserName ?? "--"}</>,
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "TotalPay",
      title: "Tổng tiền (VNĐ)",
      align: "right",
      render: (val) => _format.getVND(val, ""),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => (
        <Tag color={status === 1 ? "#cf1322" : "#389e0d"}>
          {record.StatusName}
        </Tag>
      ),
    },

    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <ActionButton
          onClick={() =>
            router.push({
              pathname: "/manager/money/out-stock-payment/detail",
              query: { id: record?.Id },
            })
          }
          icon="fad fa-edit"
          title="Cập nhật"
        />
      ),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Username:</span>
  //         {record.username}
  //       </li>
  //       <li className="md:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Tổng tiền:</span>
  //         {record.totalCash}
  //       </li>
  //       <li className="lg:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Ngày tạo:</span>
  //         {_format.getShortVNDate(record.withDrawCash)}
  //       </li>
  //       <li className="xl:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <Tag color={record.Status === 1 ? "green" : "red"}>
  //           {record.statusName}
  //         </Tag>
  //       </li>
  //       <li className="xl:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>
  //         <ActionButton
  //           onClick={() =>
  //             router.push({
  //               pathname: "/manager/money/out-stock-payment/detail",
  //               query: { id: record?.Id },
  //             })
  //           }
  //           icon="fad fa-edit"
  //           title="Cập nhật"
  //         />
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          // expandable: expandable,
          loading,
          scroll: { y: 700 },
        }}
      />
      <div className="mt-4 text-right">
        <Pagination
          total={filter?.TotalItems}
          current={filter?.PageIndex}
          pageSize={filter?.PageSize}
          onChange={(page, pageSize) =>
            handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
          }
        />
      </div>
    </>
  );
};

export { OutStockPaymentTable };
