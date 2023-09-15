import { Space } from "antd";
import Link from "next/link";
import router from "next/router";
import { ActionButton, DataTable } from "~/components";
import { payHelpStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

const columns: TColumnsType<TNewPaymentOrders> = [
  {
    title: "ID",
    dataIndex: "Id",
    render: (_) => {
      return (
        <Link passHref href={`/user/request-list/detail/?id=${_}`}>
          <a target="_blank">{_}</a>
        </Link>
      );
    },
  },
  {
    dataIndex: "Created",
    title: "Ngày đặt",
    responsive: ["lg"],
    render: (_, record) => _format.getVNDate(record.Created),
  },
  {
    title: "Tổng tiền (¥)",
    dataIndex: "TotalPrice",
    align: "right",
    render: (record) => _format.getVND(record, ""),
    responsive: ["lg"],
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "TotalPriceVND",
    align: "right",
    render: (record) => _format.getVND(record, ""),
  },
  {
    title: "Tỉ giá (VNĐ)",
    responsive: ["lg"],
    dataIndex: "Currency",
    align: "right",
    render: (record) => _format.getVND(record, ""),
  },
  {
    title: "Trạng thái",
    dataIndex: "Status",
    render: (status) => {
      const color = payHelpStatus.find((x) => x.id === status);
      return <TagStatus color={color?.color} statusName={color?.name} />;
    },
  },
  {
    title: "Thao tác",
    responsive: ["lg"],
    dataIndex: "action",
    align: "right",
    render: (_, record) => (
      <Space>
        <Link passHref href={`/user/request-list/detail/?id=${record?.Id}`}>
          <a target="_blank">
            <ActionButton
              icon="fas fa-info-square"
              title="Chi tiết"
              isButton={true}
            />
          </a>
        </Link>
      </Space>
    ),
    width: 140,
  },
];

const expandable = {
  expandedRowRender: (item) => {
    return (
      <div className="extentable">
        <div className="extentable-content">
          <div className="extentable-row">
            <span className="extentable-label">Tổng tiền: </span>
            <span className="extentable-value">
              {_format.getVND(item?.TotalPrice, " ¥")}
            </span>
          </div>
          <div className="extentable-row">
            <span className="extentable-label">Tổng tiền: </span>
            <span className="extentable-value">
              {_format.getVND(item?.TotalPriceVND, " VNĐ")}
            </span>
          </div>
          <div className="extentable-row">
            <span className="extentable-label">Tỉ giá: </span>
            <span className="extentable-value">
              {_format.getVND(item?.Currency, " VNĐ")}
            </span>
          </div>
          <div className="extentable-row">
            <span className="extentable-label">Ngày tạo: </span>
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
                  pathname: "/user/request-list/detail",
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
export const UserPayment = ({ data, isFetching }) => {
  return (
    <DataTable
      {...{
        columns,
        data: data?.Items,
        loading: isFetching,
        bordered: true,
        title: "Đơn hàng thanh toán hộ",
        expandable: expandable,
        bgHeaderType: "paymentTable",
      }}
    />
  );
};
