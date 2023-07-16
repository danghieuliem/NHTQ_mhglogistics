import { Drawer, Input, Tooltip } from "antd";
import router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { order } from "~/api";
import { ActionButton, IconButton } from "~/components";
import { DataTable } from "~/components/globals/table";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
// import ReportContent from "./Report";
import { useQueryClient } from "react-query";

type TPropsTable = {
  Id: number;
  ImageOrigin: string;
  TitleOrigin: string;
  Quantity: number;
  UPriceBuy: number;
  UPriceBuyVN: number;
  Property: string;
  Brand: string;
  mainOrder: any;
  StatusComplain: number;
};

export const OrderIDProductList: React.FC<any> = ({ data, mainOrder, refetch}) => {
  const [visible, setVisible] = useState<TPropsTable>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const onExportExcel = async () => {
    try {
      const res = await order.exportExcel({
        MainOrderID: data[0]?.MainOrderId,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdateQuantity_Brand = (data: any) => {
    setLoading(true);
    const id = toast.loading("Đang xử lý ...");

    order.update(data)
      .then(res => {
        refetch();
        queryClient.invalidateQueries("orderList");
        toast.update(id, {
          type: "success",
          render: data?.Brand ? "Cập nhật ghi chú thành công" : "Cập nhật số lượng thành công!",
          autoClose: 1000,
          isLoading: false
        })
      })
      .catch(error => {
        toast.update(id, {
          type: "error",
          render: (error as any)?.response?.data?.ResultMessage,
          autoClose: 1000,
          isLoading: false
        })
      })
      .finally(() => setLoading(false))
  }


  const columns: TColumnsType<TPropsTable> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 40,
      responsive: ["lg"],
    },
    {
      dataIndex: "ImageOrigin",
      title: "Ảnh",
      align: "center",
      render: (img) => {
        return (
          <div className="flex justify-center m-auto w-20 h-20">
            <img
              src={img ? img : "/default/pro-empty.jpg"}
              alt="image"
              width={75}
              height={75}
              style={{ borderRadius: "4px" }}
            />
          </div>
        );
      },
      width: 90,
    },
    {
      dataIndex: "TitleOrigin",
      title: "Thông tin",
      width: 500,
      render: (_, record) => {
        // const [note, setNote] = useState(record?.Brand);
        return (
          <div className="flex flex-col gap-2">
            <Tooltip title="Tên sản phẩm" className="font-semibold">
              {record?.TitleOrigin}
            </Tooltip>
            <div>
              <span className="font-semibold">Thuộc tính: </span>
              <span>{record?.Property}</span>
            </div>
            <div>
              <span className="font-semibold">Ghi chú: </span>
              <span className="break-all">{record?.Brand}</span>
            </div>
            {/* <Input
              className="!w-fit"
              disabled={mainOrder?.DatHangId || loading || mainOrder?.Status !== 2}
              prefix="Chi chú"
              value={note}
              onChange={(value) => {
                const newNote = value?.target?.value;
                setNote(newNote);
              }}
              onBlur={() => {
                if (note !== record?.Brand) {
                  handleUpdateQuantity_Brand({
                    ...record,
                    Brand: note
                  })
                }
              }}
            /> */}
          </div>
        );
      },
    },
    {
      dataIndex: "Quantity",
      title: "Số lượng",
      align: "right",
      render: (_, record) => {
        return <>{_format.getVND(_, " ")}</>
        // const [quantity, setQuantity] = useState(_);
        // return (
        //   <div>
        //     <input
        //       disabled={mainOrder?.DatHangId || loading || mainOrder?.Status !== 2}
        //       value={quantity}
        //       placeholder=""
        //       className="w-[60px] h-[28px] !rounded-[6px] border !border-[#c4c4c4] !text-center"
        //       onChange={(val) => {
        //         const valueTarget = Number(val.target.value);
        //         if (!isNaN(valueTarget)) {
        //           setQuantity(valueTarget);
        //         }
        //       }}
        //       onBlur={() => {
        //         if (quantity !== record?.Quantity) {
        //           handleUpdateQuantity_Brand({
        //             ...record,
        //             Quantity: quantity
        //           })
        //         }
        //       }}
        //     />
        //   </div>
        // );
      },
    },
    {
      dataIndex: "UPriceBuy",
      title: "Đơn giá (¥)",
      align: "right",
      render: (_, record) => {
        return <div>{_format.getVND(_, "")}</div>;
      },
    },
    {
      dataIndex: "UPriceBuyVN",
      title: "Đơn giá (VNĐ)",
      align: "right",
      render: (_, record) => {
        return <div>{_format.getVND(_, "")}</div>;
      },
    },
    {
      dataIndex: "Quantity",
      align: "right",
      title: "Thành tiền (VNĐ)",
      render: (_, record) => {
        return (
          <div>
            {_format.getVND(record?.UPriceBuyVN * record?.Quantity, "")}
          </div>
        );
      },
    },
    // {
    //   dataIndex: "action",
    //   title: "Thao tác",
    //   render: (_, record) => {
    //     return (
    //       <div>
    //         {record?.StatusComplain !== 1 &&
    //           (mainOrder?.Orders?.Status === 13 ||
    //             mainOrder?.Orders?.Status === 15) && (
    //             <ActionButton
    //               onClick={() => {
    //                 setVisible(record);
    //               }}
    //               icon="fas fa-balance-scale-right"
    //               title="Khiếu nại"
    //               btnRed
    //               isButton={true}
    //               // disabled={status !== 14}
    //             />
    //           )}
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          title: "Danh sách sản phẩm",
          extraElment: (
            <IconButton
              onClick={() => onExportExcel()}
              title="Xuất"
              icon="fas fa-file-export"
              showLoading
              toolip="Xuất thống kê"
              green
              btnClass="!h-fit"
            />
          ),
        }}
      />
      {/* <Drawer
        title="Tạo khiếu nại mới"
        placement="right"
        width={"40vw"}
        onClose={() => setVisible(null)}
        visible={!!visible?.Id}
        closable={false}
        style={{ zIndex: "10000000" }}
      >
        <ReportContent
          defaultValue={visible}
          onCancel={() => setVisible(null)}
        />
      </Drawer> */}
    </>
  );
};
