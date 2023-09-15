import { Space } from "antd";
import React from "react";
import { ActionButton, DataTable } from "~/components";
import {
  smallPackageStatus
} from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
type TProps = {
  filter;
  handleFilter: (newFilter) => void;
  refetch: () => void;
  handleAssign;
};
export const FloatingPackageTable: React.FC<TTable<TSmallPackage> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
  refetch,
  handleAssign,
}) => {
  const columns: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "Code",
      title: "Bao hàng",
      responsive: ["xl"],
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
    },
    // {
    // 	dataIndex: "MainOrderCode",
    // 	title: "Mã đơn hàng",
    // 	responsive: ["md"],
    // },
    // {
    //   dataIndex: "ProductType",
    //   title: "Loại hàng",
    //   responsive: ["xl"],
    // },
    // {
    //   dataIndex: "FeeShip",
    //   title: "Phí ship tệ",
    //   align: "right",
    // },
    {
      dataIndex: "Weight",
      title: "Cân kg",
      align: "right",
    },
    {
      dataIndex: "Volume",
      title: "Khối m3",
      align: "right",
    },
    {
      dataIndex: "Status",
      title: "Trạng thái kiện",
      render: (status, record) => (
        <TagStatus
          color={smallPackageStatus.find((x) => x.id === record.Status)?.color}
          statusName={smallPackageStatus.find((x) => x.id === record.Status)?.name}
        />
      ),
    },
    // {
    //   dataIndex: "FloatingUserName",
    //   title: "Người nhận hàng",
    //   responsive: ["xl"],
    // },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => date && _format.getVNDate(date),
      responsive: ["xl"],
      width: 200
    },
    {
      dataIndex: "action",
      align: "right",
      width: 190,
      fixed: "right",
      title: "Gán kiện",
      render: (_, record) => (
        <Space>
          {/* <ActionButton
						onClick={() => handleModalUpdate(record)}
						onClick={() => alert("update")}
						icon="fas fa-edit"
						title="Cập nhật"
					/> */}
          <ActionButton
            icon="fas fa-plus-circle"
            onClick={() => handleAssign(record, "assign1")}
            title="Mua hộ"
            isButton
            isButtonClassName="bg-blue !text-white"
          />
          <ActionButton
            icon="fas fa-plus-circle"
            onClick={() => handleAssign(record, "assign2")}
            title="Ký gửi"
            isButton
            isButtonClassName="bg-green !text-white"
          />
        </Space>
      ),
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Bao hàng:</span>
          <div>{record?.Code || "---"}</div>
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Loại hàng:</span>
          <div>{record?.ProductType || "---"}</div>
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Người nhận hàng:</span>
          {record?.FloatingUserName || "---"}
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Ngày tạo:</span>
          <div>{_format.getVNDate(record?.Created)}</div>
        </li>
      </ul>
    ),
  };

  return (
    <>
      <div>
        <DataTable
          {...{
            columns,
            data,
            loading,
            bordered: true,
            expandable: expandable,
            scroll: {y: 700},
            pagination: {current: filter.PageIndex, total: filter.TotalItems, pageSize: filter.PageSize },
            onChange: (page, pageSize) => {
              handleFilter({
                ...filter,
                PageIndex: page.current,
                PageSize: page.pageSize
              });
            },
          }}
        />
      </div>
    </>
  );
};
