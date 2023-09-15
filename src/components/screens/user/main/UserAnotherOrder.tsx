import { Space } from "antd";
import router from "next/router";
import { ActionButton, DataTable } from "~/components";
import { orderStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import Link from "next/link";

export const UserAnotherOrder = ({ data }) => {
  const columns: TColumnsType<TNewOrders> = [
    {
      title: "ID",
      dataIndex: "Id",
      render: (_) => {
        return (
          <Link href={`/user/order-list/detail/?id=${_}`} passHref>
            <a target="_blank">{_}</a>
          </Link>
        );
      },
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
      align: "right",
      responsive: ["lg"],
      render: (record) => _format.getVND(record, ""),
    },
    {
      title: "Số tiền đã cọc",
      dataIndex: "Deposit",
      align: "right",
      responsive: ["lg"],
      render: (record) => _format.getVND(record, ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (status) => {
        const color = orderStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={color?.name} />
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "right",
      responsive: ["lg"],
      render: (_, record) => (
        <Space>
          <Link href={`/user/order-list/detail/?id=${record?.Id}`} passHref>
            <a target="_blank">
              <ActionButton
                icon={"fas fa-info-square"}
                title={"Chi tiết"}
                isButton={true}
              />
            </a>
          </Link>
        </Space>
      ),
      // width: 140,
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
    <DataTable
      {...{
        columns,
        data: data?.Items,
        bordered: true,
        title: "Đơn hàng mua hàng hộ khác",
        expandable: expandable,
        bgHeaderType: "anotherTable",
      }}
    />
  );
};
