import { Pagination, Tag } from "antd";
import router from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { transportationOrder } from "~/api";
import { ActionButton, DataTable, FilterSelect, toast } from "~/components";
import { transportStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

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
  const mutationUpdate = useMutation(transportationOrder.update, {
    onSuccess: () => {
      toast.success("Cập nhật ký gửi thành công");
      refetch();
    },
    onError: toast.error,
  });

  const _onPress = (data: TUserDeposit) => {
    mutationUpdate.mutateAsync(data);
  };

  const columns: TColumnsType<TUserDeposit> = [
    {
      dataIndex: "Id",
      title: "ID Đơn",
      width: 80,
    },
    {
      dataIndex: "UserName",
      title: <>UserName</>,
      width: 120,
    },
    {
      dataIndex: "WareHouseFrom",
      title: <>Thông tin</>,
      responsive: ["xl"],
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
      responsive: ["xl"],
      width: 250,
      render: (_, record) => {
        return (
          <>
            <div className="flex justify-between">
              <span className="font-semibold">Phí cân nặng: </span>
              <span>
                {_format.getVND(record?.PayableWeight * record?.FeeWeightPerKg, ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phí khối: </span>
              <span>
                {_format.getVND(record?.VolumePayment * record?.FeePerVolume, ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phí vận chuyển: </span>
              <span>{_format.getVND(record?.DeliveryPrice, ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tổng tiền: </span>
              <span>{_format.getVND(record?.TotalPriceVND, ' ')}</span>
            </div>
          </>
        );
      },
    },
    {
      dataIndex: "SalerID",
      title: <>Nhân viên</>,
      render: (_, record) => {
        return (
          <FilterSelect
            placeholder="Kinh doanh"
            data={userSale}
            defaultValue={{
              Id: userSale?.find((x) => x.Id === record?.SalerID)?.Id,
              UserName: userSale?.find((x) => x.Id === record?.SalerID)
                ?.UserName,
            }}
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
      dataIndex: "OrderTransactionCode",
      title: <>Mã vận đơn</>,
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      width: 200,
      render: (date) => date && _format.getVNDate(date),
      responsive: ["xl"],
    },
    // {
    //   dataIndex: "WareHouseTo",
    //   title: (
    //     <>
    //       Kho <br /> Việt Nam
    //     </>
    //   ),
    //   responsive: ["xl"],
    // },
    // {
    //   dataIndex: "ShippingTypeName",
    //   title: (
    //     <>
    //       Phương thức <br /> vận chuyển
    //     </>
    //   ),
    //   responsive: ["xl"],
    // },
    // {
    //   dataIndex: "TotalPriceVND",
    //   title: (
    //     <>
    //       Tổng tiền <br /> (VNĐ)
    //     </>
    //   ),
    //   align: "right",
    //   render: (fee) => _format.getVND(fee, " "),
    // },
    // {
    //   dataIndex: "PayableWeight",
    //   align: "right",
    //   title: (
    //     <>
    //       Cân nặng <br /> (KG)
    //     </>
    //   ),
    //   render: (_) => _format.getVND(_, " "),
    // },
    // {
    //   dataIndex: "VolumePayment",
    //   align: "right",
    //   title: (
    //     <>
    //       Cân nặng <br /> (KG)
    //     </>
    //   ),
    //   render: (_) => _format.getVND(_, " "),
    // },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = transportStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record?.StatusName}</Tag>;
      },
      width: 120,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => {
        return (
          <>
            {record?.Status === 2 && (RoleID === 1 || RoleID === 3) && (
              <ActionButton
                onClick={() => _onPress({ ...record, Status: 3 })}
                icon="fas fa-check"
                title="Duyệt đơn này!"
              />
            )}
            <ActionButton
              onClick={() => {
                router.push({
                  pathname: "/manager/deposit/deposit-list/detail",
                  query: { id: record.Id },
                });
              }}
              icon="fas fa-edit"
              title={"Cập nhật"}
            />
          </>
        );
      },
      // responsive: ["xl"],
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Kho Trung Quốc:</span>
          {record?.WareHouseFrom}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Kho Việt Nam:</span>
          {record?.WareHouseTo}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Phương thức vận chuyển:</span>
          {record?.ShippingTypeName}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày tạo:</span>
          {_format.getVNDate(record?.Created)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày về đến kho đích:</span>
          {_format.getVNDate(record?.DateInVNWareHouse)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày yêu cầu xuất kho:</span>
          {_format.getVNDate(record?.DateExportRequest)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày xuất kho:</span>
          {_format.getVNDate(record?.DateExport)}
        </li>
      </ul>
    ),
  };

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          loading,
          bordered: true,
          expandable: expandable,
          scroll: { y: 600 },
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
