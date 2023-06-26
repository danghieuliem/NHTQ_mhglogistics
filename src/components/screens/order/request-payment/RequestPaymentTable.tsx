import { Pagination } from "antd";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { payHelp } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { paymentStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

type TProps = {
  filter;
  handleFilter: (newFilter) => void;
  userSale;
  refetch: () => void;
};

export const RequestPaymentTable: React.FC<
  TTable<TRequestPaymentOrder> & TProps
> = ({ data, filter, handleFilter, loading, userSale, refetch }) => {
  const columns: TColumnsType<TRequestPaymentOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left",
      width: 120,
    },
    {
      dataIndex: "SalerID",
      title: (
        <>
          Nhân viên <br /> kinh doanh
        </>
      ),
      render: (_, record) => {
        const salerName = userSale?.find(
          (x) => x.Id === record?.SalerID
        )?.UserName;
        return <>{salerName || "-"}</>;
      },
      width: 120,
    },
    {
      dataIndex: "TotalPrice",
      title: "Tổng tiền (¥)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 120,
    },
    {
      dataIndex: "TotalPriceVND",
      title: "Tổng tiền (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
      width: 120,
    },
    {
      dataIndex: "Currency",
      title: "Tỷ giá",
      align: "right",
      render: (currency) => _format.getVND(currency, " "),
      width: 120,
    },
    {
      dataIndex: "Note",
      title: "Ghi chú khách hàng",
      width: 200,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = paymentStatus?.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
      width: 120,
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
      width: 200,
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="grid grid-cols-1 gap-2">
          <Link
            href={`/manager/order/request-payment/detail/?id=${record?.Id}`}
          >
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Chi tiết"
                isButton
                isButtonClassName="bg-main !text-white"
              />
            </a>
          </Link>
          {record?.Status === 1 && (
            <ActionButton
              onClick={() => {
                const id = toast.loading("Đang xử lý ...");
                payHelp
                  .confirm(record?.Id)
                  .then(() => {
                    toast.update(id, {
                      render: "Duyệt thành công!",
                      type: "success",
                      isLoading: false,
                      autoClose: 0,
                    });
                    refetch();
                  })
                  .catch((error) => {
                    toast.update(id, {
                      render: (error as any)?.response?.data?.ResultMessage,
                      type: "success",
                      isLoading: false,
                      autoClose: 0,
                    });
                  });
              }}
              icon="mr-0"
              title="Duyệt đơn"
              isButton
              isButtonClassName="bg-blue !text-white"
            />
          )}
        </div>
      ),
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
          scroll: { x: 1200, y: 700 },
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
