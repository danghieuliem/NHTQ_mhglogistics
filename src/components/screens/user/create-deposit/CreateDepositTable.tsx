import { Checkbox } from "antd";
import React from "react";
import {
  ActionButton,
  DataTable,
  FormInput,
  FormInputNumber,
} from "~/components";
import { toast } from "~/components/toast";
import { TControl } from "~/types/field";
import { TColumnsType, TTable } from "~/types/table";

type TProps = TControl<TUserCreateDeposit> &
  TTable<TUserCreateDepositBill> & {
    onPress: (data: TUserCreateDeposit) => void;
  };

export const CreateDepositTable: React.FC<TProps & { setValue }> = ({
  control,
  data,
  remove,
  setValue,
}) => {
  function handleCheckbox(ctrl, e) {
    setValue(ctrl, e.target.checked);
  }

  const columns: TColumnsType<TUserCreateDepositBill> = [
    {
      dataIndex: "Id",
      title: "STT",
      align: "right",
      render: (_, __, index) => ++index,
      width: 50,
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã kiện",
      responsive: ["md"],
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`smallPackages.${index}.OrderTransactionCode`}
          placeholder=""
          hideError
          rules={{
            required: "Mã kiện không được trống",
            validate: {
              check: (value) => {
                if (/\s/g.test(value)) {
                  return "Mã kiện đang trống!";
                }
              },
            },
          }}
        />
      ),
      width: 160,
    },
    {
      dataIndex: "Category",
      title: "Loại sản phẩm",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`smallPackages.${index}.Category`}
          placeholder=""
        />
      ),
      responsive: ["md"],
      width: 120,
    },
    {
      dataIndex: "Amount",
      title: "Số lượng",
      align: "right",
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`smallPackages.${index}.Amount`}
          placeholder=""
        />
      ),
      width: 80,
      responsive: ["md"],
    },
    {
      dataIndex: "FeeShip",
      title: "Phí COD (¥)",
      align: "right",
      render: (_, __, index) => (
        <FormInputNumber
          prefix={"¥ "}
          control={control}
          name={`smallPackages.${index}.FeeShip`}
          placeholder=""
        />
      ),
      width: 80,
      responsive: ["md"],
    },
    {
      dataIndex: "IsCheckProduct",
      title: "Dịch vụ",
      align: "center",
      render: (_, __, index) => (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-left">Kiểm đếm: </span>
            <Checkbox
              defaultChecked={false}
              onChange={(e) =>
                handleCheckbox(`smallPackages.${index}.IsCheckProduct`, e)
              }
            />
          </div>
          <div className="flex justify-between">
            <span className="text-left">Đóng gỗ: </span>
            <Checkbox
              defaultChecked={false}
              onChange={(e) =>
                handleCheckbox(`smallPackages.${index}.IsPacked`, e)
              }
            />
          </div>
          <div className="flex justify-between">
            <span className="text-left">Bảo hiểm: </span>
            <Checkbox
              defaultChecked={false}
              onChange={(e) =>
                handleCheckbox(`smallPackages.${index}.IsInsurance`, e)
              }
            />
          </div>
        </div>
      ),
      width: 80,
      responsive: ["md"],
    },
    {
      dataIndex: "UserNote",
      title: "Ghi chú",
      width: 200,
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`smallPackages.${index}.UserNote`}
          placeholder=""
        />
      ),
      responsive: ["md"],
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      render: (_, __, index) => (
        <ActionButton
          title="Xoá"
          icon="mr-0"
          onClick={() => {
            if (data.length > 1) {
              remove(index);
            } else {
              toast.warning("Phải có ít nhất 1 kiện ký gửi");
            }
          }}
          isButton
          isButtonClassName="bg-red !text-white"
        />
      ),
      width: 80,
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
      }}
    />
  );
};
