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
      responsive: ["sm"],
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã kiện",
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
      responsive: ["lg"],
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
      title: "Kiểm đếm",
      align: "center",
      render: (_, __, index) => (
        <Checkbox
          defaultChecked={false}
          onChange={(e) =>
            handleCheckbox(`smallPackages.${index}.IsCheckProduct`, e)
          }
        />
      ),
      width: 80,
      responsive: ["lg"],
    },
    {
      dataIndex: "IsPacked",
      title: "Đóng gỗ",
      width: 80,
      align: "center",
      render: (_, __, index) => (
        <Checkbox
          defaultChecked={false}
          onChange={(e) => handleCheckbox(`smallPackages.${index}.IsPacked`, e)}
        />
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "IsInsurance",
      title: "Bảo hiểm",
      align: "center",
      width: 80,
      render: (_, __, index) => (
        <Checkbox
          defaultChecked={false}
          onChange={(e) =>
            handleCheckbox(`smallPackages.${index}.IsInsurance`, e)
          }
        />
      ),
      responsive: ["lg"],
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
      responsive: ["lg"],
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

  const expandable = {
    expandedRowRender: (item, index) => {
      return (
        <div className="extentable w-full">
          <div className="extentable-content grid grid-cols-3 gap-3 w-full">
            <div className="extentable-row">
              <span className="extentable-value">
                <FormInput
                  control={control}
                  name={`smallPackages.${index}.Category`}
                  placeholder=""
                  label="Loại sản phẩm"
                />
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-value">
                <FormInputNumber
                  control={control}
                  label="Số lượng"
                  name={`smallPackages.${index}.Amount`}
                  placeholder=""
                />
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-value">
                <FormInputNumber
                  prefix={"¥ "}
                  label="Phí COD (¥)"
                  control={control}
                  name={`smallPackages.${index}.FeeShip`}
                  placeholder=""
                />
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-value">
                <FormInput
                  control={control}
                  label="Ghi chú"
                  name={`smallPackages.${index}.UserNote`}
                  placeholder=""
                />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 col-span-2">
              <div className="extentable-row justify-center">
                <span className="extentable-value">
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) =>
                      handleCheckbox(`smallPackages.${index}.IsCheckProduct`, e)
                    }
                  />
                </span>
                <span className="extentable-label ml-2">Kiểm đếm: </span>
              </div>
              <div className="extentable-row justify-center">
                <span className="extentable-value">
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) =>
                      handleCheckbox(`smallPackages.${index}.IsPacked`, e)
                    }
                  />
                </span>
                <span className="extentable-label ml-2">Đóng gỗ: </span>
              </div>
              <div className="extentable-row justify-center">
                <span className="extentable-value">
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) =>
                      handleCheckbox(`smallPackages.${index}.IsInsurance`, e)
                    }
                  />
                </span>
                <span className="extentable-label ml-2">Bảo hiểm: </span>
              </div>
            </div>
          </div>
        </div>
      );
    },
    defaultExpandAllRows: true,
  };

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        expandable,
      }}
    />
  );
};
