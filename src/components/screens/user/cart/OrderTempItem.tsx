import { Divider, Image, Input, Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { orderTemp } from "~/api";
import { ActionButton, DataTable, IconButton } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

type TProps = {
  // orderTempData: TUserCartOrderTemp;
  index?: number;
  deleteProduct?: () => void;
  onHandleProduct?: (
    type: "update" | "delete",
    data: { Id: number; Quantity: number; Brand?: string }
  ) => void;
  canUpdate?: boolean;
  isLoading?: boolean;
  data: TUserCartOrderTemp[];
  refetchCart?: any;
  isAllowDeletedItem?: boolean;
};

const InputNote = ({ canUpdate, record, onHandleProduct, disabled }) => {
  const [note, setNote] = useState(record?.Brand);

  return (
    <span className="">
      {canUpdate ? (
        <Input
          size="small"
          className="!w-[100%]"
          value={note}
          disabled={disabled}
          onChange={(val) => {
            setNote(val?.target?.value);
          }}
          onBlur={() => {
            if (note !== record?.Brand) {
              onHandleProduct("update", {
                Id: record?.Id,
                Brand: note,
                Quantity: record?.Quantity,
              });
            }
          }}
        />
      ) : (
        <>{note}</>
      )}
    </span>
  );
};

const InputQuantity = ({ onHandleProduct, record, canUpdate, disabled }) => {
  const [value, setValue] = useState(record?.Quantity);

  return (
    <>
      {canUpdate ? (
        <input
          value={value}
          placeholder=""
          disabled={disabled}
          className="w-[60px] h-[28px] !rounded-[6px] border !border-[#c4c4c4] !text-center"
          onChange={(val) => {
            const valueTarget = Number(val.target.value);
            if (!isNaN(valueTarget)) {
              setValue(valueTarget);
            }
          }}
          onBlur={() => {
            if (record?.Quantity !== value) {
              onHandleProduct("update", {
                Id: record?.Id,
                Quantity: value,
              });
            }
          }}
        />
      ) : (
        <>{record?.Quantity}</>
      )}
    </>
  );
};

const MobileItem = ({ data, onHandleProduct, canUpdate, disabled }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      {data?.map((item, index) => (
        <React.Fragment
          key={`${item?.Id}-${item?.OrderShopTempId}-${item?.TitleOrigin}`}
        >
          <div
            className="grid grid-cols-3 gap-2 p-2 w-full"
            key={`${item?.Id}-${item?.OrderShopTempId}-${item?.TitleOrigin}`}
          >
            <div className="col-span-3 text-[#6A6A6A] font-bold">
              {item?.TitleOrigin}
            </div>
            <div
              className={clsx(
                "col-span-1 flex flex-col gap-1",
                !canUpdate && "w-[120px] max-w-full"
              )}
            >
              <img
                src={item?.ImageOrigin}
                alt=""
                width={"100%"}
                className="rounded-[6px]"
              />
              {canUpdate && (
                <span className="flex flex-wrap justify-between items-center">
                  <span className="font-bold text-sec">Stt: {++index}</span>
                  <ActionButton
                    title="Xoá SP"
                    isButton
                    isButtonClassName="bg-red !text-white"
                    icon="fas fa-trash-alt text-text"
                    onClick={() => {
                      onHandleProduct("delete", {
                        Id: item?.Id,
                        Quantity: 0,
                      });
                    }}
                  />
                </span>
              )}
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-1 h-fit">
              <div className="col-span-2 flex items-start justify-between">
                <span className="font-bold w-[100px] mr-2 leading-[inital]">
                  Thuộc tính:{" "}
                </span>
                <span
                  className="text-label text-xs text-right max-w-[130px]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item?.Property}
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="font-bold">Số lượng</span>
                <InputQuantity
                  canUpdate={canUpdate}
                  record={item}
                  onHandleProduct={onHandleProduct}
                  disabled={disabled}
                />
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="font-bold">Đơn giá</span>
                <span>
                  {_format.getVND(item?.PriceOrigin, " ¥")} /{" "}
                  {_format.getVND(item?.UPriceBuyVN, " đ")}
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="font-bold">Thành tiền</span>
                <span>{_format.getVND(item?.EPriceBuyVN, " đ")}</span>
              </div>
              <span className="col-span-2">
                <span className="font-bold">Ghi chú: </span>
                <InputNote
                  canUpdate={canUpdate}
                  record={item}
                  disabled={disabled}
                  onHandleProduct={onHandleProduct}
                />
              </span>
            </div>
          </div>
          <Divider className="!my-1" />
        </React.Fragment>
      ))}
    </div>
  );
};

export const OrderTempItem: React.FC<TTable<TUserCartOrderTemp> & TProps> = ({
  data,
  canUpdate = true,
  refetchCart,
  isAllowDeletedItem = true,
}) => {
  const mutationUpdateProduct = useMutation(orderTemp.updateField);
  const mutationDeleteProduct = useMutation(orderTemp.delete);
  const [loading, setLoading] = useState(false);

  const onHandleProduct = async (
    type: "update" | "delete",
    data: { Id: number; Quantity: number; Brand?: string }
  ) => {
    const id = toast.loading("Đang xử lý ...");
    setLoading(true);
    try {
      if (type === "update") {
        await mutationUpdateProduct.mutateAsync(data).then(() => {
          toast.update(id, {
            render: "Cập nhật sản phẩm thành công.",
            type: "success",
            isLoading: false,
            autoClose: 500,
          });
        });
      } else {
        await mutationDeleteProduct.mutateAsync(data.Id).then(() => {
          toast.update(id, {
            render: "Xoá sản phẩm thành công.",
            type: "success",
            isLoading: false,
            autoClose: 500,
          });
        });
      }
      refetchCart();
    } catch (error) {
      toast.update(id, {
        render: (error as any)?.response?.data?.ResultMessage,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo<TColumnsType<TUserCartOrderTemp>>(() => {
    const cols: TColumnsType<TUserCartOrderTemp> = [
      {
        dataIndex: "Id",
        key: "Id",
        title: "Thông tin sản phẩm",
        width: 400,
        render: (_, record, index) => {
          return (
            <div className="grid grid-cols-4 gap-1">
              <div className="col-span-1 flex items-start">
                <span className="mr-1 font-bold">{++index}</span>
                <Image
                  src={
                    decodeURIComponent(record?.ImageOrigin) ||
                    "/default/pro-empty.jpg"
                  }
                  width={80}
                  preview={false}
                  className="rounded-[6px]"
                />
              </div>
              <div className="col-span-3 text-black pl-1 flex flex-col gap-1">
                <Link href={record?.LinkOrigin}>
                  <a target="_blank">
                    <Tooltip title="Link sản phẩm">
                      <span className="text-[#6A6A6A]">
                        {record?.TitleOrigin}
                      </span>
                    </Tooltip>
                  </a>
                </Link>
                <span className="flex items-start justify-between">
                  <span className="font-bold w-[100px] mr-2 leading-[inital]">
                    Thuộc tính:{" "}
                  </span>
                  <span
                    className="text-label text-xs text-right max-w-[160px]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {record?.Property}
                  </span>
                </span>
                <span className="">
                  <span className="font-bold">Ghi chú: </span>
                  <InputNote
                    canUpdate={canUpdate}
                    record={record}
                    onHandleProduct={onHandleProduct}
                    disabled={loading}
                  />
                </span>
              </div>
            </div>
          );
        },
      },
      {
        dataIndex: "Quantity",
        title: "Số lượng",
        align: "center",
        width: 100,
        render: (_, record) => {
          return (
            <InputQuantity
              record={record}
              onHandleProduct={onHandleProduct}
              disabled={loading}
              canUpdate={canUpdate}
            />
          );
        },
        responsive: canUpdate ? ["lg"] : ["md"],
      },
      {
        dataIndex: "PricePromotion",
        align: "center",
        title: (
          <>
            Đơn giá
            <br />
            (¥/VNĐ)
          </>
        ),
        width: 160,
        render: (value, record) => {
          return (
            <>
              {_format.getVND(value, "")} /{" "}
              {_format.getVND(record?.UPriceBuyVN, "")}
            </>
          );
        },
        responsive: canUpdate ? ["lg"] : ["md"],
      },
      {
        dataIndex: "EPriceBuyVN",
        title: "Thành tiền",
        align: "center",
        width: 120,
        render: (value) => _format.getVND(value, " đ"),
        responsive: canUpdate ? ["lg"] : ["md"],
      },
      {
        dataIndex: "action",
        title: "Thao tác",
        align: "right",
        width: 100,
        render: (_, record) => {
          return (
            <IconButton
              title=""
              btnClass="!bg-[transparent] outline-none"
              btnIconClass="text-[#CECECE] text-md hover:!text-red"
              toolip="Xóa sản phẩm này!"
              icon="fas fa-trash-alt"
              onClick={() => {
                onHandleProduct("delete", {
                  Id: record?.Id,
                  Quantity: 0,
                });
              }}
            />
          );
        },
        responsive: canUpdate ? ["lg"] : ["xxl"],
      },
    ];

    !isAllowDeletedItem && cols.pop();

    return cols;
  }, [isAllowDeletedItem]);

  return (
    <>
      {window.innerWidth > 768 ? (
        <DataTable
          style="cartTable"
          data={data}
          columns={columns}
          mediaWidth={canUpdate ? 992 : null}
        />
      ) : (
        <MobileItem
          data={data}
          onHandleProduct={onHandleProduct}
          canUpdate={canUpdate}
          disabled={loading}
        />
      )}
    </>
  );
};
