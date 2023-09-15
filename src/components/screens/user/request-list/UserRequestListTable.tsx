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
import { EPayHelp, payHelpStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import clsx from "clsx";

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
          data={payHelpStatus}
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
      toast.error((error as any)?.response?.data?.ResultMessage);
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
      dataIndex: "Created",
      title: "TimeLine",
      render: (_, record) => (
        <React.Fragment>
          {record.Created && (
            <p
              className={clsx(
                record?.Status === EPayHelp.ChoDuyet && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đơn mới: </span>
              <span>
                {_format.getVNDate(record.Created, "HH:mm")} -
                {_format.getVNDate(record.Created, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.ConfirmDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DaDuyet && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đã duyệt:</span>
              <span>
                {_format.getVNDate(record.ConfirmDate, "HH:mm")} -
                {_format.getVNDate(record.ConfirmDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.PaidDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DaThanhToan && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Thanh toán:</span>
              <span>
                {_format.getVNDate(record.PaidDate, "HH:mm")} -
                {_format.getVNDate(record.PaidDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.CompleteDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DaHoanThanh && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Hoàn thành:</span>
              <span>
                {_format.getVNDate(record.CompleteDate, "HH:mm")} -
                {_format.getVNDate(record.CompleteDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.CancelDate && (
            <p
              className={clsx(
                record?.Status === EPayHelp.DonHuy && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Huỷ đơn:</span>
              <span>
                {_format.getVNDate(record.CancelDate, "HH:mm")} -
                {_format.getVNDate(record.CancelDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
        </React.Fragment>
      ),
      width: 280,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status) => {
        const color = payHelpStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
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
            {record?.Status === EPayHelp.ChoDuyet ||
              (record?.Status === EPayHelp.DaDuyet && (
                <ActionButton
                  onClick={() => {
                    Modal.confirm({
                      title: <b>Thanh toán đơn này!</b>,
                      onOk: () => handleAction(record, EPayHelp.DaThanhToan),
                    });
                  }}
                  icon="fas fa-dollar-sign"
                  title="Thanh toán"
                  isButton={true}
                  isButtonClassName="bg-blue !text-white"
                />
              ))}
            {record.Status === EPayHelp.ChoDuyet && (
              <ActionButton
                onClick={() => {
                  Modal.confirm({
                    title: <b>Hủy yêu cầu thanh toán này!</b>,
                    onOk: () => handleAction(record, EPayHelp.DonHuy),
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
              {item?.Status === EPayHelp.ChoDuyet ||
                (item?.Status === EPayHelp.DaDuyet && (
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
              {item.Status !== EPayHelp.ChoDuyet && (
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
