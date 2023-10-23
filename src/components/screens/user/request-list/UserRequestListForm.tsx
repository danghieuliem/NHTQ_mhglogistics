import { Card } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { payHelp } from "~/api";
import { DataTable, FormInputNumber, FormTextarea } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { paymentData } from "~/configs/appConfigs";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

type TProps = {
  data: TRequestPaymentOrder;
};

export const UserRequestListForm: React.FC<TProps> = ({ data }) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { control, handleSubmit, getValues, watch, reset } =
    useForm<TRequestPaymentOrder>({
      mode: "onBlur",
    });

  useEffect(() => {
    reset(data);
  }, [data]);

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
      responsive: ["lg"],
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (value) => _format.getVNDate(value),
      responsive: ["lg"],
    },
    {
      dataIndex: "action",
      title: "Ghi chú",
      render: (_, record) => {
        return <div>{record?.Desc2}</div>;
      },
      responsive: ["lg"],
    },
    {
      dataIndex: "action",
      title: (
        <>
          Tỉ giá
          <br />
          (VNĐ)
        </>
      ),
      align: "right",
      render: () => _format.getVND(data?.Currency, " "),
    },
    {
      dataIndex: "action",
      title: (
        <>
          Giá tiền
          <br />
          (¥)
        </>
      ),
      align: "right",
      render: (_, record) => _format.getVND(record?.Desc1, " "),
    },
    {
      dataIndex: "action",
      title: (
        <>
          Giá tiền
          <br />
          (VNĐ)
        </>
      ),
      align: "right",
      render: (_, record) =>
        _format.getVND(record?.Desc1 * data?.Currency, " "),
    },
  ];

  return (
    <div
      style={{
        opacity: updateLoading === true || deleteLoading === true ? "0.8" : "1",
        pointerEvents:
          updateLoading === true || deleteLoading === true ? "none" : "all",
      }}
      className="grid grid-cols-12 gap-4"
    >
      <Card
        className="col-span-12 lg:col-span-3"
        extra={
          <div className="col-span-3 text-base font-bold flex justify-between uppercase">
            Thông tin
            <TagStatus
              color={paymentData[data?.Status]?.color}
              statusName={data?.StatusName}
            />
          </div>
        }
      >
        <div className="col-span-12 lg:col-span-3 grid grid-cols-1 lg:grid-cols-1 gap-2">
          <FormInputNumber
            control={control}
            name="Currency"
            label="Tỉ giá"
            placeholder={`${_format.getVND(data?.Currency)}`}
            required={false}
            disabled
          />
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
          <FormInputNumber
            control={control}
            name="TotalPriceVND"
            label="Tổng tiền (VNĐ)"
            placeholder=""
            suffix=" VNĐ"
            required={false}
            disabled
          />
          <FormTextarea
            control={control}
            name="Note"
            label="Ghi chú"
            placeholder=""
            required={false}
            disabled
          />
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
      </Card>
      <div className="col-span-12 lg:col-span-9 h-fit">
        <DataTable
          {...{
            data: data?.PayHelpDetails as any,
            columns,
            title: "Danh sách chi tiết",
          }}
        />
      </div>
    </div>
  );
};
