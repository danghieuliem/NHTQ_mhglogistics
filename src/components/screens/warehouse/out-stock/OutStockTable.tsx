import { Input, Tag } from "antd";
import router from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { outStockSession } from "~/api";
import { ActionButton, DataTable, IconButton } from "~/components";
import { smallPackageStatusData } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import TagStatus from "../../status/TagStatus";

const CustomInput = ({ data, setIdsExport, idsExport, handleOnChangeKey }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Input
      placeholder="Nhập mã vận đơn cần quét (Enter để quét)"
      className="!w-[42%] !py-[8px]"
      value={inputValue}
      onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
      allowClear={true}
      onPressEnter={(val) => {
        const target = val.target as HTMLInputElement;
        if (!target.value) {
          toast.warn("Vui lòng nhập mã vận đơn!");
          return;
        }
        setInputValue(target.value);
        const insert = data.find(
          (d) => d?.OrderTransactionCode === inputValue.toString().trim()
        )?.Id;

        if (idsExport.find((id) => id === insert)) {
          toast.warn("Bạn đã quét mã này rồi!");
          return;
        }

        if (insert) {
          handleOnChangeKey([...idsExport, insert]);
        }

        setInputValue("");
      }}
    />
  );
};

export const OutStockTable: React.FC<
  TTable<TWarehouseVN> & { UID: number }
> = ({ data, UID }) => {
  const [idsExport, setIdsExport] = useState([]);

  const columns: TColumnsType<TWarehouseCN> = [
    {
      dataIndex: "MainOrderId",
      title: "Order ID",
      render: (_, record) => {
        return (
          <a
            target={"_blank"}
            onClick={() =>
              router.push({
                pathname: "/manager/order/order-list/detail",
                query: {
                  id: record?.MainOrderId
                    ? record?.MainOrderId
                    : record?.TransportationOrderId,
                },
              })
            }
          >
            {record?.MainOrderId
              ? record?.MainOrderId
              : record?.TransportationOrderId}
          </a>
        );
      },
    },
    {
      dataIndex: "OrderTypeName",
      title: "Loại ĐH",
      render: (_) => {
        return (
          <TagStatus
            color={_ === "Đơn ký gửi" ? "blue" : "green"}
            statusName={_}
          />
        );
      },
    },
    // {
    //   dataIndex: "IsPackged",
    //   title: "Đơn hàng",
    //   render: (_, record) => (
    //     <div className="flex">
    //       <div className="mx-1">
    //         <p className="font-medium">KĐ</p>
    //         {record.IsCheckProduct ? (
    //           <i className="fas fa-check-circle text-xl text-success"></i>
    //         ) : (
    //           <i className="fas fa-times-circle text-xl text-warning"></i>
    //         )}
    //       </div>
    //       <div className="mx-1">
    //         <p className="font-medium">ĐG</p>
    //         {record.IsPackged ? (
    //           <i className="fas fa-check-circle text-xl text-success"></i>
    //         ) : (
    //           <i className="fas fa-times-circle text-xl text-warning"></i>
    //         )}
    //       </div>
    //       <div className="mx-1">
    //         <p className="font-medium">BH</p>
    //         {record.IsInsurance ? (
    //           <i className="fas fa-check-circle text-xl text-success"></i>
    //         ) : (
    //           <i className="fas fa-times-circle text-xl text-warning"></i>
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng (kg)",
      align: "right",
    },
    {
      dataIndex: "VolumePayment",
      title: "Khối (m3)",
      align: "right",
    },
    {
      dataIndex: "LWH",
      title: "Kích thước",
      align: "right",
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => (
        <TagStatus
          color={smallPackageStatusData.find((x) => x.id === status)?.color}
          statusName={smallPackageStatusData.find((x) => x.id === status)?.name}
        />
      ),
    },
  ];

  const queryClient = useQueryClient();

  const handleOutStock = () => {
    const id = toast.loading("Đang xử lý ...");
    outStockSession
      .create({
        UID: UID,
        Note: "",
        SmallPackageIds: idsExport,
      })
      .then((res) => {
        queryClient.invalidateQueries("outStockSession");
        router.push({
          pathname: "/manager/warehouse/out-stock/detail",
          query: { id: res?.Data?.Id },
        });
        toast.update(id, {
          render: "Chọn đơn hàng thành công, đang chuyển trang ...",
          autoClose: 500,
          type: "success",
          isLoading: false,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultCode,
          autoClose: 3000,
          type: "error",
          isLoading: false,
        });
      });
  };

  const handleOnChangeKey = (val) => {
    setIdsExport(val);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-end">
        <div className="flex items-center w-[80%]">
          <div className="w-full">
            <CustomInput
              data={data}
              setIdsExport={setIdsExport}
              idsExport={idsExport}
              handleOnChangeKey={handleOnChangeKey}
            />
            <div className="mt-4">
              <div className="text-green font-semibold w-[200px]">
                Số kiện tìm thấy:{" "}
                <span className="text-orange ml-1">{data?.length}</span>{" "}
              </div>
              <div className="text-green font-semibold w-[200px]">
                Số kiện chọn xuất kho:
                <span className="text-orange ml-1">{idsExport?.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {idsExport?.length > 0 && (
            <ActionButton
              onClick={() => handleOutStock()}
              icon="fas fa-hand-holding-box"
              title="Xuất kho các kiện đã chọn!"
              isButton
              isButtonClassName="bg-main !text-white"
            />
          )}
        </div>
      </div>
      <DataTable
        {...{
          data: data,
          columns: columns,
          // expandable: expandable,
          rowSelection: {
            type: "checkbox",
            onChange: (value) => handleOnChangeKey(value),
            selectedRowKeys: idsExport,
          },
        }}
      />
    </div>
  );
};
