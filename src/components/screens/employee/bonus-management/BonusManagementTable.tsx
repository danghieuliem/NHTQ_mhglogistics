import { Modal, Pagination, Space, Tag } from "antd";
import router from "next/router";
import React from "react";
import { ActionButton, DataTable, toast } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

type TProps = {
  filter: {
    TotalItems: number;
    PageIndex: number;
    PageSize: number;
  };
  handleFilter: (newFilter) => void;
  handlePayment: (id: number) => void;
  RoleID: number;
  type: number;
};

export const BonusManagementTable: React.FC<TTable<TBonus> & TProps> = ({
  data,
  filter,
  handleFilter,
  loading,
  handlePayment,
  RoleID,
  type,
}) => {
  const columns: TColumnsType<TBonus> = [
    {
      dataIndex: "PayHelpOrderId",
      title: "ID Đơn",
      width: 80,
      render: (_, record) => {
        let mainID = null;
        switch (type) {
          case 0:
            mainID = record?.MainOrderId;
            break;
          case 1:
            mainID = record?.TransportationOrderId;
            break;
          default:
            mainID = record?.PayHelpOrderId;
            break;
        }
        return <>{mainID}</>;
      },
    },
    {
      dataIndex: "PercentReceive",
      title: "Phần trăm",
      align: "right",
      width: 100,
    },
    {
      dataIndex: "TotalPriceReceive",
      title: "Hoa hồng (VNĐ)",
      align: "right",
      render: (_, record) => {
        return <div>{_format.getVND(record?.TotalPriceReceive, "")}</div>;
      },
    },
    {
      dataIndex: "UserName",
      title: "Username",
    },
    {
      dataIndex: "RoleName",
      title: "Quyền hạn",
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => (
        <Tag color={status !== 1 ? "blue" : "red"}>{record.StatusName}</Tag>
      ),
    },
    // {
    //   dataIndex: "Created",
    //   title: "Ngày tạo - người tạo",
    //   render: (_, record) => (
    //     <>
    //       {_format.getVNDate(record.Created)} - {record.CreatedBy}
    //     </>
    //   ),
    //   width: 250,
    //   responsive: ["xl"],
    // },
    {
      dataIndex: "MainOrderCompleteDate",
      title: "Ngày hoàn thành đơn",
      render: (_, record) => (
        <>{_format.getVNDate(record?.MainOrderCompleteDate)}</>
      ),
    },
    {
      dataIndex: "Updated",
      title: <>Ngày cập nhật</>,
      render: (_, record) => (
        <>
          {_format.getVNDate(record.Updated)} <br /> {record.UpdatedBy}
        </>
      ),
      // width: 250,
      responsive: ["xl"],
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => {
        return (
          <Space>
            {record.Status === 1 &&
              (RoleID === 1 || RoleID === 3 || RoleID === 8) && (
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: "Thanh toán hoa hồng đơn hàng này?",
                      content: (
                        <div className="mt-4 pb-4 border-b border-[#d5d4d4]">
                          <div className="py-1 pl-5 flex justify-between">
                            Username:{" "}
                            <span className="font-bold">
                              {record?.UserName}
                            </span>
                          </div>
                          <div className="py-1 pl-5 flex justify-between">
                            Hoa hồng:{" "}
                            <span className="font-bold">
                              {_format.getVND(
                                record?.TotalPriceReceive,
                                " VNĐ"
                              )}
                            </span>
                          </div>
                        </div>
                      ),
                      okText: "Thanh toán",
                      cancelText: "Hủy",

                      onOk: () => {
                        if (!record?.TotalPriceReceive) {
                          toast.warning("Chưa có tiền hoa hồng để thanh toán!");
                          return;
                        }
                        return handlePayment(record.Id);
                      },
                    })
                  }
                  icon="far fa-credit-card"
                  title="Thanh toán"
                  iconContainerClassName="iconBlue"
                  btnBlue
                />
              )}
            <ActionButton
              onClick={() => {
                let routerPush = {};
                switch (type) {
                  case 0:
                    routerPush = {
                      pathname: "/manager/order/order-list/detail",
                      query: { id: record?.MainOrderId },
                    };
                    break;
                  case 1:
                    routerPush = {
                      pathname: "/manager/deposit/deposit-list/detail",
                      query: { id: record?.TransportationOrderId },
                    };
                    break;
                  default:
                    routerPush = {
                      pathname: "/manager/order/request-payment/detail",
                      query: { id: record?.PayHelpOrderId },
                    };
                    break;
                }
                router.push(routerPush);
              }}
              icon="fas fa-info"
              title="Xem chi tiết đơn"
              iconContainerClassName=" iconYellow"
              btnYellow
            />
          </Space>
        );
      },
      responsive: ["xl"],
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="flex justify-between py-2">
          <span className="font-medium mr-4">Ngày tạo:</span>
          {_format.getVNDate(record.Created)}
        </li>
        <li className="flex justify-between py-2">
          <span className="font-medium mr-4">Ngày cập nhật:</span>
          {_format.getVNDate(record.Updated)}
        </li>
        <li className="flex justify-between py-2">
          <span className="font-medium mr-4">Thao tác:</span>
          <Space>
            {record.Status === 1 && (RoleID === 1 || RoleID === 3) && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Thanh toán hoa hồng đơn hàng này?",
                    content: (
                      <div className="mt-4 pb-4 border-b border-[#d5d4d4]">
                        <div className="py-1 pl-5 flex justify-between">
                          Username:{" "}
                          <span className="font-bold">{record?.UserName}</span>
                        </div>
                        <div className="py-1 pl-5 flex justify-between">
                          Hoa hồng:{" "}
                          <span className="font-bold">
                            {_format.getVND(record?.TotalPriceReceive, " VNĐ")}
                          </span>
                        </div>
                      </div>
                    ),
                    okText: "Thanh toán",
                    cancelText: "Hủy",

                    onOk: () => {
                      if (!record?.TotalPriceReceive) {
                        toast.warning("Chưa có tiền hoa hồng để thanh toán!");
                        return;
                      }
                      return handlePayment(record.Id);
                    },
                  })
                }
                icon="far fa-credit-card"
                title="Thanh toán"
                iconContainerClassName="iconBlue"
                btnBlue
              />
            )}
            <ActionButton
              onClick={() =>
                router.push({
                  pathname: "/manager/order/order-list/detail",
                  query: { id: record.MainOrderId },
                })
              }
              icon="fas fa-info"
              title="Xem chi tiết đơn"
              iconContainerClassName=" iconYellow"
              btnYellow
            />
          </Space>
        </li>
      </ul>
    ),
  };

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          expandable: expandable,
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
