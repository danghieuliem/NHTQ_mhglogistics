import { Modal, Pagination, Space, Tag } from "antd";
import router from "next/router";
import React from "react";
import { ActionButton, DataTable, toast } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

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
      width: 60,
      align: "right",
      fixed: "left",
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
      width: 140,
    },
    {
      dataIndex: "UserName",
      title: "Username",
      width: 140,
    },
    {
      dataIndex: "RoleName",
      title: "Quyền hạn",
      width: 140,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      width: 140,
      render: (status, record) => (
        <TagStatus
          color={status !== 1 ? "blue" : "red"}
          statusName={record.StatusName}
        />
      ),
    },
    {
      dataIndex: "MainOrderCompleteDate",
      title: "Ngày hoàn thành",
      render: (_, record) => (
        <>{_format.getVNDate(record?.MainOrderCompleteDate)}</>
      ),
      width: 200,
    },
    {
      dataIndex: "Updated",
      title: <>Ngày cập nhật</>,
      render: (_, record) => (
        <>
          {_format.getVNDate(record.Updated)} <br />{" "}
          <span className="text-green font-bold">{record.UpdatedBy}</span>
        </>
      ),
      width: 200,
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      width: 180,
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="flex flex-wrap gap-1">
            <ActionButton
              isButton
              // isButtonClassName="bg-main !text-white !h-fit"
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
              icon="!mr-0"
              title="Chi tiết"
            />
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
                  icon="!mr-0"
                  title="Thanh toán"
                  isButton
                  isButtonClassName="bg-blue !text-white h-fit"
                />
              )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          scroll: { y: 700, x: 1200 },
        }}
      />
      <Pagination
        total={filter?.TotalItems}
        current={filter?.PageIndex}
        pageSize={filter?.PageSize}
        onChange={(page, pageSize) =>
          handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
        }
      />
    </>
  );
};
