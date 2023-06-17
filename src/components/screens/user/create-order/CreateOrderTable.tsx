import React from "react";
import { toast } from "react-toastify";
import {
  ActionButton,
  DataTable,
  FormInput,
  FormInputNumber,
  FormUpload
} from "~/components";
import { TControl } from "~/types/field";
import { TColumnsType, TTable } from "~/types/table";

export const CreateOrderTable: React.FC<
  TControl<TUserCreateOrder> & TTable<TUserCreateOrderProduct>
> = ({ control, data, remove }) => {
  const columns: TColumnsType<TUserCreateOrderProduct> = [
    {
      dataIndex: "Id",
      title: "STT",
      align: "center",
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "ImageProduct",
      title: (
        <>
          Hình ảnh <br /> sản phẩm
        </>
      ),
      align: "center",
      render: (_, __, index) => (
        <FormUpload
          image
          control={control}
          name={`Products.${index}.ImageProduct` as const}
        />
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "LinkProduct",
      title: "Link sản phẩm",
      align: "center",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.LinkProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "NameProduct",
      title: "Tên sản phẩm",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.NameProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "PropertyProduct",
      title: (
        <>
          Màu sắc/ <br /> Kích thước
        </>
      ),
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.PropertyProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "PriceProduct",
      title: (
        <>
          Giá sản phẩm <br /> (¥){" "}
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (_, __, index) => (
        <FormInputNumber
          prefix="¥ "
          control={control}
          name={`Products.${index}.PriceProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "QuantityProduct",
      title: "Số lượng",
      align: "right",
      responsive: ["sm"],
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`Products.${index}.QuantityProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "NoteProduct",
      title: "Ghi chú",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.NoteProduct` as const}
          placeholder=""
        />
      ),
      responsive: ["xl"],
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, __, index) => (
        <ActionButton
          title="Xoá"
          icon="fas fa-minus-circle"
          onClick={() => {
            if (data.length > 1) {
              remove(index);
            } else {
              toast.warning("Phải có ít nhất 1 đơn hàng");
            }
          }}
          btnRed
        />
      ),
    },
  ];

  const expandable = {
    expandedRowRender: (item, index) => {
      return (
        <div className="extentable">
          <div className="extentable-content w-full grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="extentable-row justify-center">
              <span className="extentable-value">
                <FormUpload
                  image
                  control={control}
                  label="Ảnh sản phẩm"
                  name={`Products.${index}.ImageProduct` as const}
                />
              </span>
            </div>
            <div className="extentable-row justify-center">
              <span className="extentable-value">
                <FormInput
                  control={control}
                  name={`Products.${index}.LinkProduct` as const}
                  placeholder="Link sản phẩm"
                  label="Link sản phẩm"
                  hideError
                  rules={{ required: "This field is required" }}
                />
              </span>
            </div>
            <div className="extentable-row justify-center">
              <span className="extentable-value">
                <FormInputNumber
                  prefix="¥ "
                  control={control}
                  name={`Products.${index}.PriceProduct` as const}
                  placeholder=""
                  hideError
                  label="Giá sản phẩm"
                  rules={{ required: "This field is required" }}
                />
              </span>
            </div>
            <div className="extentable-row justify-center">
              <span className="extentable-value">
                <FormInputNumber
                  control={control}
                  name={`Products.${index}.QuantityProduct` as const}
                  placeholder=""
                  label="Số lượng"
                  hideError
                  rules={{ required: "This field is required" }}
                />
              </span>
            </div>
            <div className="extentable-row justify-center">
              <span className="extentable-value">
                <FormInput
                  control={control}
                  name={`Products.${index}.PropertyProduct` as const}
                  placeholder=""
                  hideError
                  label="Thuộc tính"
                  rules={{ required: "This field is required" }}
                />
              </span>
            </div>
            <div className="extentable-row justify-center">
              <span className="extentable-value">
                <FormInput
                  control={control}
                  label="Ghi chú:"
                  name={`Products.${index}.NoteProduct` as const}
                  placeholder=""
                />
              </span>
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        expandable: expandable,
        title: "Danh sách sản phẩm",
      }}
    />
  );
};
