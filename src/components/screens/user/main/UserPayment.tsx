import { Space } from "antd";
import Link from "next/link";
import { ActionButton, DataTable } from "~/components";
import { payHelpStatus } from "~/configs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

const columns: TColumnsType<TNewPaymentOrders> = [
  {
    title: "ID",
    dataIndex: "Id",
    responsive: ["md"],
    render: (value) => {
      return (
        <Link passHref href={`/user/request-list/detail/?id=${value}`}>
          <a target="_blank">{value}</a>
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
    render: (record) => _format.getYuan(record, ""),
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

export const UserPayment = ({ data, isFetching }) => {
  return (
    <DataTable
      {...{
        columns,
        data: data?.Items,
        loading: isFetching,
        bordered: true,
        title: "Đơn hàng thanh toán hộ",

        bgHeaderType: "paymentTable",
      }}
    />
  );
};
