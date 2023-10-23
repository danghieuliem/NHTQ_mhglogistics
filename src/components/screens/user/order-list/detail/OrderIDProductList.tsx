import { Tooltip } from "antd";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { order } from "~/api";
import { ActionButton } from "~/components";
import { DataTable } from "~/components/globals/table";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

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
  LinkOrigin?: string;
};

export const OrderIDProductList: React.FC<any> = ({ data }) => {
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
      responsive: ["md"],
      render: (_, record) => {
        // const [note, setNote] = useState(record?.Brand);
        return (
          <div className="flex flex-col gap-2">
            <Link href={record?.LinkOrigin}>
              <a target="_blank">
                <Tooltip title="Tên sản phẩm" className="font-semibold">
                  {record?.TitleOrigin}
                </Tooltip>
              </a>
            </Link>
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
      responsive: ["sm"],
      render: (value) => {
        return <>{_format.getVND(value, "")}</>;
      },
    },
    {
      dataIndex: "UPriceBuy",
      title: (
        <>
          Đơn giá
          <br />
          (¥)
        </>
      ),
      align: "right",
      responsive: ["md"],
      render: (value) => {
        return <div>{_format.getVND(value, "")}</div>;
      },
    },
    {
      dataIndex: "UPriceBuyVN",
      title: (
        <>
          Đơn giá
          <br />
          (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (value) => {
        return <div>{_format.getVND(value, "")}</div>;
      },
    },
    {
      dataIndex: "Quantity",
      align: "right",
      title: (
        <>
          Thành tiền
          <br />
          (VNĐ)
        </>
      ),
      render: (_, record) => {
        return (
          <div>
            {_format.getVND(record?.UPriceBuyVN * record?.Quantity, "")}
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
          title: "Danh sách sản phẩm",
          extraElement: (
            <ActionButton
              onClick={() => onExportExcel()}
              title="Xuất"
              icon="fas fa-file-export"
              isButton
              isButtonClassName="bg-green !text-white"
            />
          ),
        }}
      />
    </>
  );
};
