import { Modal, Pagination } from "antd";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { transportationOrder } from "~/api";
import { ActionButton, DataTable, FilterSelect } from "~/components";
import { transportStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

type TProps = {
  refetch: () => void;
  RoleID: number;
  dathangList?: any;
  saleList?: any;
  filter;
  handleFilter: (newFilter) => void;
  userSale;
};

export const DepositListTable: React.FC<TTable<TUserDeposit> & TProps> = ({
  data,
  loading,
  refetch,
  RoleID,
  filter,
  handleFilter,
  userSale,
}) => {
  const _onPress = (data: TUserDeposit) => {
    const id = toast.loading("Đang xử lý ...");
    transportationOrder.update(data)
      .then((res) => {
        refetch();
        toast.update(id, {
          render: "Duyệt đơn thành công!",
          isLoading: false,
          type: "success",
          autoClose: 1000,
        });
      })
      .catch(() => {
        toast.update(id, {
          render: "Duyệt đơn thất bại!",
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
  };

  const columns: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      align: "right",
      fixed: "left",
    },
    {
      dataIndex: "OrderTransactionCode",
      title: <>Mã vận đơn</>,
      width: 120,
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: <>UserName</>,
      width: 120,
    },
    {
      dataIndex: "WareHouseFrom",
      title: <>Thông tin</>,
      width: 250,
      render: (_, record) => {
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between">
              <span className="font-semibold">Kho Trung Quốc: </span>
              <span>{record?.WareHouseFrom}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Kho Việt Nam: </span>
              <span>{record?.WareHouseTo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phương thức: </span>
              <span>{record?.ShippingTypeName}</span>
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "TotalPriceVND",
      title: <>Thông tin phí (VNĐ)</>,
      width: 250,
      render: (_, record) => {
        return (
          <>
            <div className="flex justify-between">
              <span className="font-semibold">Phí cân nặng: </span>
              <span>
                {_format.getVND(
                  record?.PayableWeight * record?.FeeWeightPerKg,
                  " "
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phí khối: </span>
              <span>
                {_format.getVND(
                  record?.VolumePayment * record?.FeePerVolume,
                  " "
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phí vận chuyển: </span>
              <span>{_format.getVND(record?.DeliveryPrice, " ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tổng tiền: </span>
              <span>{_format.getVND(record?.TotalPriceVND, " ")}</span>
            </div>
          </>
        );
      },
    },
    {
      dataIndex: "SalerID",
      title: <>Nhân viên</>,
      width: 160,
      render: (_, record) => {
        return (
          <FilterSelect
            placeholder="Kinh doanh"
            data={userSale}
            defaultValue={
              !!record.SalerID && {
                Id: userSale?.find((x) => x.Id === record?.SalerID)?.Id,
                UserName: userSale?.find((x) => x.Id === record?.SalerID)
                  ?.UserName,
              }
            }
            select={{ label: "UserName", value: "Id" }}
            callback={async (value) => {
              transportationOrder
                .updateStaff({ SalerID: value, Id: record?.Id })
                .then(() => {
                  toast.success("Cập nhật nhân viên thành công!");
                  refetch();
                });
            }}
            handleSearch={(val) => val}
          />
        );
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      width: 180,
      render: (date) => date && _format.getVNDate(date),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = transportStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
      width: 120,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      width: 120,
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="grid grid-cols-1 gap-2">
            {record?.Status === 2 && (RoleID === 1 || RoleID === 3 || RoleID === 7) && (
              <ActionButton
                onClick={() => Modal.confirm({
                  title: "Xác nhận duyệt đơn này?",
                  onOk: () => _onPress({ ...record, Status: 3 })
                })}
                icon="!mr-0"
                title="Duyệt đơn"
                isButton
                isButtonClassName="bg-blue !text-white"
              />
            )}
            <Link
              href={`/manager/deposit/deposit-list/detail/?id=${record.Id}`}
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
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          loading,
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
