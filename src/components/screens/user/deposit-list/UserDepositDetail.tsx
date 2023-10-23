import { Modal, Table, Tag } from "antd";
import "antd/dist/antd.css";
import { Button, FormCard } from "~/components";
import { orderStatus2Data } from "~/configs/appConfigs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

export const UserDepositDetail = ({ visible, onCancel, dataDetail }) => {
  const columns1: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "Id",
      title: "ID",
      align: "center",
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      align: "center",
    },
    {
      dataIndex: "UserName",
      title: "Username",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "PayableWeight",
      title: (
        <>
          Cân nặng <br /> (Kg)
        </>
      ),
      align: "center",
      responsive: ["sm"],
    },
    {
      dataIndex: "TotalPriceVND",
      title: () => (
        <>
          Tổng tiền <br /> (VNĐ)
        </>
      ),
      align: "center",
      render: (money) => money && _format.getVND(money, ""),
      responsive: ["xl"],
    },
  ];

  const columns2: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "WareHouseFrom",
      title: "Kho TQ",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "WareHouseTo",
      title: "Kho VN",
      align: "center",
      responsive: ["md"],
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      align: "center",
      render: (date) => _format.getShortVNDate(date),
      responsive: ["lg"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      align: "center",
      render: (status) => {
        const orderStatus = orderStatus2Data.find((x) => x.id === status);
        return <Tag color={orderStatus?.color}>{orderStatus?.name}</Tag>;
      },
      responsive: ["xl"],
    },
  ];

  const columns3: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "DateInTQWarehouse",
      title: () => (
        <>
          Ngày về <br /> kho TQ
        </>
      ),
      align: "center",
      render: (date) => date && _format.getShortVNDate(date),
      responsive: ["xl"],
    },
    {
      dataIndex: "ShippingTypeVNName",
      title: "HTVC",
      align: "center",
      responsive: ["xl"],
    },
    {
      dataIndex: "StaffNote",
      title: () => (
        <>
          Ghi chú <br /> Nhân viên
        </>
      ),
      align: "center",
      responsive: ["xl"],
    },
    {
      dataIndex: "Note",
      title: () => (
        <>
          Ghi chú <br /> Khách hàng
        </>
      ),
      align: "center",
      responsive: ["md"],
    },
  ];

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      closable={false}
      footer={null}
      className="!w-fit !min-w-[40vw]"
    >
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <p>Chi tiết đơn hàng # {dataDetail?.Id}</p>
        </FormCard.Header>
        <FormCard.Body>
          <Table
            columns={columns1}
            dataSource={[dataDetail]}
            pagination={false}
          />
          <Table
            columns={columns2}
            dataSource={[dataDetail]}
            pagination={false}
            className="my-10"
          />
          <Table
            columns={columns3}
            dataSource={[dataDetail]}
            pagination={false}
          />
        </FormCard.Body>
        <FormCard.Footer>
          <Button title="Okay" btnClass="!bg-red" onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
