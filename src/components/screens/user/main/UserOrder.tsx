import { Space, Tag } from "antd";
import router from "next/router";
import { ActionButton, DataTable } from "~/components";
import { orderStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
export const UserOrder = ({ data, isLoading, isFetching, pagination }) => {
  const columns: TColumnsType<TNewOrders> = [
    {
      title: "ID",
      dataIndex: "Id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "Created",
      responsive: ["md"],
      render: (record) => _format.getVNDate(record),
    },
    {
      title: "Tổng tiền",
      dataIndex: "TotalOrderAmount",
      align: "right",
      render: (record) => _format.getVND(record, ""),
    },
    {
      title: "Số tiền phải cọc",
      dataIndex: "AmountDeposit",
      responsive: ["lg"],
      align: "right",
      render: (record) => _format.getVND(record, ""),
    },
    {
      title: "Số tiền đã cọc",
      dataIndex: "Deposit",
      responsive: ["lg"],
      align: "right",
      render: (record) => _format.getVND(record, ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status, record) => {
        const color = orderStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record?.StatusName}</Tag>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "right",
      // width: 140,
      responsive: ["lg"],
      render: (_, record) => (
        <Space>
          <ActionButton
            icon="fas fa-info-square mr-1"
            title="Chi tiết đơn"
            onClick={() =>
              router.push({
                pathname: "/user/order-list/detail",
                query: { id: record?.Id },
              })
            }
            isButton={true}
          />
        </Space>
      ),
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row">
              <span className="extentable-label">Số tiền phải cọc: </span>
              <span className="extentable-value">
                {_format.getVND(item?.AmountDeposit)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Số tiền đã cọc: </span>
              <span className="extentable-value">
                {_format.getVND(item?.Deposit)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Ngày đặt: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
          </div>
          <div className="extentable-actions">
            <div className="extentable-button">
              <ActionButton
                icon="fas fa-info-square mr-1"
                title="Chi tiết"
                onClick={() =>
                  router.push({
                    pathname: "/user/order-list/detail",
                    query: { id: item?.Id },
                  })
                }
                isButton={true}
              />
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="tableBox">
      <DataTable
        {...{
          columns,
          data: data?.Items,
          bordered: true,
          loading: isFetching,
          title: "Đơn hàng mua hộ",
          expandable,
          // pagination,
        }}
      />
    </div>
  );
};
