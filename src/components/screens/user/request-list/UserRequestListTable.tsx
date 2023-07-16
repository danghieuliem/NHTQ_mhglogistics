import { Modal, Pagination } from "antd";
import router from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { payHelp } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { EPaymentData, paymentStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

type TProps = {
  filter;
  handleFilter: (newFilter) => void;
  refetch: () => void;
};

export const UserRequestListTable: React.FC<
  TTable<TRequestPaymentOrder> & TProps
> = ({ data, filter, handleFilter, loading, refetch }) => {
  const handleAction = async (
    targetData: TRequestPaymentOrder,
    type: number
  ) => {
    try {
      await payHelp.updatePayHelp({ id: targetData?.Id, status: type });
      toast.success(type === 2 ? "Thanh toán thành công!" : "Hủy thành công!");
      refetch();
    } catch (error) {
      toast.success((error as any)?.response?.data?.ResultMessage);
    }
  };

  const columns: TColumnsType<TRequestPaymentOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 90,
      // responsive: ["lg"],
    },
    {
      dataIndex: "Created",
      title: "Ngày gửi",
      render: (date) => _format.getVNDate(date),
      responsive: ["md"],
    },
    {
      dataIndex: "TotalPrice",
      title: "Tổng tiền (¥)",
      align: "right",
      responsive: ["lg"],
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Tổng tiền (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Currency",
      title: "Tỷ giá (VNĐ)",
      align: "right",
      render: (excharge) => _format.getVND(excharge, " "),
      responsive: ["lg"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = paymentStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      responsive: ["lg"],
      render: (_, record) => {
        return (
          <div>
            {record?.Status === EPaymentData.Unpaid ||
              (record?.Status === EPaymentData.Confirmed && (
                <ActionButton
                  onClick={() => {
                    Modal.confirm({
                      title: <b>Thanh toán đơn này!</b>,
                      onOk: () => handleAction(record, 2),
                    });
                  }}
                  icon="fas fa-dollar-sign"
                  title="Thanh toán"
                  isButton={true}
                />
              ))}
            {record.Status !== EPaymentData.Finished &&
              record.Status !== EPaymentData.Paid &&
              record.Status !== EPaymentData.Canceled && (
                <ActionButton
                  onClick={() => {
                    Modal.confirm({
                      title: <b>Hủy yêu cầu thanh toán này!</b>,
                      onOk: () => handleAction(record, 3),
                    });
                  }}
                  icon="fas fa-trash"
                  title="Hủy yêu cầu"
                  isButton={true}
                />
              )}
            <ActionButton
              onClick={() =>
                router.push({
                  pathname: "/user/request-list/detail",
                  query: { id: record?.Id },
                })
              }
              icon="far fa-info-square"
              title="Chi tiết đơn"
              isButton={true}
            />
          </div>
        );
      },
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row">
              <span className="extentable-label">Tỷ giá: </span>
              <span className="extentable-value">
                {_format.getVND(item?.Currency)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Tỷ giá: </span>
              <span className="extentable-value">
                {_format.getVND(item?.TotalPrice, " ¥")}
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
              {item?.Status === EPaymentData.Unpaid ||
                (item?.Status === EPaymentData.Confirmed && (
                  <ActionButton
                    onClick={() => {
                      Modal.confirm({
                        title: <b>Thanh toán đơn này!</b>,
                        onOk: () => handleAction(item, 2),
                      });
                    }}
                    icon="fas fa-dollar-sign"
                    title="Thanh toán"
                    isButton={true}
                  />
                ))}
            </div>
            <div className="extentable-button">
              {item.Status !== EPaymentData.Finished &&
                item.Status !== EPaymentData.Paid &&
                item.Status !== EPaymentData.Canceled && (
                  <ActionButton
                    onClick={() => {
                      Modal.confirm({
                        title: <b>Hủy yêu cầu thanh toán này!</b>,
                        onOk: () => handleAction(item, 3),
                      });
                    }}
                    icon="fas fa-trash"
                    title="Hủy yêu cầu"
                    isButton={true}
                  />
                )}
            </div>

            <div className="extentable-button">
              <ActionButton
                onClick={() =>
                  router.push({
                    pathname: "/user/request-list/detail",
                    query: { id: item?.Id },
                  })
                }
                icon="far fa-info-square"
                title="Chi tiết đơn"
                isButton={true}
              />
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          expandable: expandable,
          scroll: { y: 700 },
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
