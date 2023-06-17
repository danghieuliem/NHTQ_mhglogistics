import { Tag } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { payHelp } from "~/api";
import {
  DataTable,
  FormInput,
  FormInputNumber,
  FormTextarea,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { paymentData } from "~/configs/appConfigs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

type TProps = {
  data: TRequestPaymentOrder;
};

export const UserRequestListForm: React.FC<TProps> = ({ data }) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { control, handleSubmit, getValues, watch } = useForm<TRequestPaymentOrder>({
    mode: "onBlur",
    defaultValues: {...data},
  });

  const mutationUpdatePayment = useMutation(payHelp.update, {
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      Router.push("/user/request-list");
    },
  });

  // const _onUpdate = (data: TRequestPaymentOrder) => {
  //   try {
  //     setUpdateLoading(true);
  //     mutationUpdatePayment.mutateAsync(data);
  //   } catch (error) {
  //     setUpdateLoading(false);
  //     toast.error(error);
  //   }
  // };

  const _onDeletePayment = (data: TRequestPaymentOrder) => {
    try {
      setDeleteLoading(true);

      mutationUpdatePayment.mutateAsync({
        ...data,
        Status: 3,
      });
    } catch (error) {
      setDeleteLoading(false);
      toast.error(error);
    }
  };

  const columns: TColumnsType<
    TCreateRequestPaymentOrder & { Desc2: string; Desc1: number }
  > = [
    {
      dataIndex: "Id",
      title: "Id",
    },
    {
      dataIndex: "action",
      title: "Tỉ giá (VNĐ)",
      align: "right",
      render: () => _format.getVND(data?.Currency, " "),
    },
    {
      dataIndex: "action",
      title: "Giá tiền (¥)",
      align: "right",
      render: (value, record, index) => _format.getVND(record?.Desc1, " "),
    },
    {
      dataIndex: "action",
      title: "Giá tiền (VNĐ)",
      align: "right",
      render: (value, record, index) =>
        _format.getVND(record?.Desc1 * data?.Currency, " "),
    },
    {
      dataIndex: "action",
      title: "Ghi chú",
      render: (value, record, index) => {
        return <div>{record?.Desc2}</div>;
      },
      responsive: ['lg']
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (value) => _format.getVNDate(value),
      responsive: ['lg']
    },
  ];

  const expandable = {
    expandedRowRender: (item) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row">
              <span className="extentable-label">Ngày tạo: </span>
              <span className="extentable-value">
                {_format.getVNDate(item?.Created)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Ghi chú: </span>
              <span className="extentable-value">
                {item?.Desc2}
              </span>
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <div
      style={{
        opacity: updateLoading === true || deleteLoading === true ? "0.8" : "1",
        pointerEvents:
          updateLoading === true || deleteLoading === true ? "none" : "all",
      }}
      className="grid grid-cols-12 gap-4"
    >
      <div className="tableBox col-span-12 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="col-span-3 text-base font-bold py-2 flex justify-between uppercase border-b border-main">
          Thông tin
          <Tag color={paymentData[data?.Status]?.color}>{data?.StatusName}</Tag>
        </div>
        {/* <div className="col-span-1 my-3">
          <FormInput
            control={control}
            name="UserName"
            label="UserName"
            placeholder={data?.UserName}
            disabled
            required={false}
          />
        </div> */}
        <div className="col-span-3">
          <FormInputNumber
            control={control}
            name="Currency"
            label="Tỉ giá"
            placeholder={`${_format.getVND(data?.Currency)}`}
            required={false}
            disabled
          />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <FormInputNumber
            control={control}
            name="TotalPrice"
            label="Tổng tiền Tệ (¥)"
            // placeholder={`${_format.getVND(data?.TotalPrice)}`}
            placeholder=""
            prefix="¥ "
            required={false}
            disabled
          />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <FormInputNumber
            control={control}
            name="TotalPriceVND"
            label="Tổng tiền (VNĐ)"
            placeholder=""
            suffix=" VNĐ"
            required={false}
            disabled
          />
        </div>
        <div className="col-span-3">
          <FormTextarea
            control={control}
            name="Note"
            label="Ghi chú"
            placeholder=""
            required={false}
            disabled
          />
        </div>
        <div className="col-span-3 flex">
          <Link href="/user/request-list">
            <a>
              <IconButton
                onClick={undefined}
                title="Trở về"
                icon="fas fa-undo-alt"
                toolip=""
              />
            </a>
          </Link>
          {data?.Status === 1 && (
            <IconButton
              onClick={handleSubmit(_onDeletePayment)}
              title="Hủy yêu cầu"
              icon={deleteLoading ? "fas fa-sync fa-spin" : "fas fa-trash-alt"}
              toolip="Hủy yêu cầu thanh toán này!"
              btnClass="!ml-auto"
            />
          )}
        </div>
      </div>
      <div className="tableBox col-span-12 lg:col-span-9 h-fit">
        <DataTable
          {...{
            data: data?.PayHelpDetails,
            columns,
            title: "Danh sách chi tiết",
            expandable
          }}
        />
      </div>
    </div>
  );
};
