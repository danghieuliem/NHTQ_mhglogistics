import { Input, Tag } from "antd";
import router from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { outStockSession } from "~/api";
import { DataTable, IconButton } from "~/components";
import { smallPackageStatusData } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";

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
        return <Tag color={_ === "Đơn ký gửi" ? "blue" : "green"}>{_}</Tag>;
      },
    },
    {
      dataIndex: "IsPackged",
      title: "Đơn hàng",
      render: (_, record) => (
        <div className="flex">
          <div className="mx-1">
            <p className="font-medium">KĐ</p>
            {record.IsCheckProduct ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="mx-1">
            <p className="font-medium">ĐG</p>
            {record.IsPackged ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="mx-1">
            <p className="font-medium">BH</p>
            {record.IsInsurance ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
        </div>
      ),
    },
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
        <Tag color={smallPackageStatusData.find((x) => x.id === status)?.color}>
          {smallPackageStatusData.find((x) => x.id === status)?.name}
        </Tag>
      ),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record, index) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Loại ĐH:</span>
  //         <div>{record.OrderTypeName}</div>
  //       </li>
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Đơn hàng:</span>
  //         <div className="flex justify-center">
  //           <div className="mx-1">
  //             <p className="font-medium">KĐ</p>
  //             {record.IsCheckProduct ? (
  //               <i className="fas fa-check-circle text-xl text-success"></i>
  //             ) : (
  //               <i className="fas fa-times-circle text-xl text-warning"></i>
  //             )}
  //           </div>
  //           <div className="mx-1">
  //             <p className="font-medium">ĐG</p>
  //             {record.IsPackged ? (
  //               <i className="fas fa-check-circle text-xl text-success"></i>
  //             ) : (
  //               <i className="fas fa-times-circle text-xl text-warning"></i>
  //             )}
  //           </div>
  //           <div className="mx-1">
  //             <p className="font-medium">BH</p>
  //             {record.IsInsurance ? (
  //               <i className="fas fa-check-circle text-xl text-success"></i>
  //             ) : (
  //               <i className="fas fa-times-circle text-xl text-warning"></i>
  //             )}
  //           </div>
  //         </div>
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Cân nặng (KG):</span>
  //         <div>{record.Weight}</div>
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Kích thước:</span>
  //         <div>{record.LWH}</div>
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Tổng ngày lưu kho:</span>
  //         <div>{record.TotalDateInLasteWareHouse}</div>
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <div>
  //           <Tag
  //             color={
  //               smallPackageStatusData.find((x) => x.id === record.Status)
  //                 ?.color
  //             }
  //           >
  //             {smallPackageStatusData.find((x) => x.id === record.Status)?.name}
  //           </Tag>
  //         </div>
  //       </li>
  //     </ul>
  //   ),
  // };

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
          // render: "Chọn đơn hàng thành công, đang chuyển tr",
          autoClose: 1000,
          // type: "success",
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
      <div className="flex justify-between items-end mb-4">
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
            <IconButton
              onClick={() => handleOutStock()}
              btnClass="!mr-4"
              icon="fas fa-hand-holding-box"
              btnIconClass="!mr-2"
              title="Xuất kho các kiện đã chọn!"
              toolip=""
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
