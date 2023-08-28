import { Modal } from "antd";
import Link from "next/link";
import router from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { payHelp } from "~/api";
import {
  ActionButton,
  DataTable,
  FilterRangeDate,
  FilterSelect,
  IconButton,
} from "~/components";
import { EPaymentData, paymentStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

type TProps = {
  filter;
  handleFilter: (newFilter) => void;
  refetch: () => void;
};

const UserRequestListFilter = ({ handleFilter }) => {
  const Status = useRef<number>(-1);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-2">
        <FilterSelect
          data={paymentStatus}
          placeholder={"Trạng thái"}
          label="Trạng thái"
          select={{ label: "name", value: "id" }}
          handleSearch={(val: number) => {
            Status.current = val;
          }}
          isClearable
        />
      </div>
      <div className="col-span-2">
        <FilterRangeDate
          placeholder="Từ ngày / đến ngày"
          format="DD/MM/YYYY"
          handleDate={(val: string[]) => {
            FromDate.current = val[0];
            ToDate.current = val[1];
          }}
        />
      </div>
      <div className="col-span-1 flex items-end">
        <IconButton
          onClick={() => {
            handleFilter({
              Status: Status.current,
              FromDate: FromDate.current,
              ToDate: ToDate.current,
              PageIndex: 1,
            });
          }}
          icon="far fa-search"
          title="Tìm kiếm"
          showLoading
          toolip=""
        />
      </div>
    </div>
  );
};

const UserRequestListFilterMemo = React.memo(UserRequestListFilter);

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
          <div className="flex gap-1 flex-wrap">
            <Link passHref href={`/user/request-list/detail/?id=${record?.Id}`}>
              <a target="_blank" rel="noopener noreferrer">
                <ActionButton
                  icon="fas fa-info-square"
                  title="Chi tiết"
                  isButton={true}
                />
              </a>
            </Link>
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
                  isButtonClassName="bg-blue !text-white"
                />
              ))}
            {record.Status === EPaymentData.Unpaid && (
              <ActionButton
                onClick={() => {
                  Modal.confirm({
                    title: <b>Hủy yêu cầu thanh toán này!</b>,
                    onOk: () => handleAction(record, 3),
                  });
                }}
                icon="fas fa-trash"
                title="Hủy"
                isButton={true}
                isButtonClassName="bg-red !text-white"
              />
            )}
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
          extraElmentClassName: "!w-1/2 ml-auto",
          extraElment: (
            <UserRequestListFilterMemo handleFilter={handleFilter} />
          ),
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
          },
          onChange: (page, pageSize) => {
            handleFilter({
              ...filter,
              PageIndex: page.current,
              PageSize: page.pageSize,
            });
          },
        }}
      />
    </>
  );
};
