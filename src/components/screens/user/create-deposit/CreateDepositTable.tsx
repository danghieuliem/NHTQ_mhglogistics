import { Checkbox } from "antd";
import React from "react";
import {
  ActionButton,
  DataTable,
  FormCheckbox,
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
  function test() {}

  function handleCheckbox(ctrl, e) {
    setValue(ctrl, e.target.checked);
  }

  const columns: TColumnsType<TUserCreateDepositBill> = [
    {
      dataIndex: "Id",
      title: "STT",
      align: "center",
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã kiện",
      align: "center",
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
    },
    {
      dataIndex: "Category",
      title: "Loại sản phẩm",
      align: "center",
      responsive: ["lg"],
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`smallPackages.${index}.Category`}
          placeholder=""
        />
      ),
    },
    {
      dataIndex: "Amount",
      title: "Số lượng",
      align: "center",
      responsive: ["lg"],
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`smallPackages.${index}.Amount`}
          placeholder=""
        />
      ),
    },
    {
      dataIndex: "FeeShip",
      title: (
        <>
          Phí COD <br /> Trung QUỐC (¥)
        </>
      ),
      align: "center",
      render: (_, __, index) => (
        <FormInputNumber
          prefix={"¥ "}
          control={control}
          name={`smallPackages.${index}.FeeShip`}
          placeholder=""
        />
      ),
    },
    {
      dataIndex: "IsCheckProduct",
      title: "Kiểm đếm",
      align: "center",
      responsive: ["md"],
      render: (_, __, index) => (
        <Checkbox
          defaultChecked={false}
          onChange={(e) =>
            handleCheckbox(`smallPackages.${index}.IsCheckProduct`, e)
          }
        />
      ),
    },
    {
      dataIndex: "IsPacked",
      title: "Đóng gỗ",
      align: "center",
      responsive: ["md"],
      render: (_, __, index) => (
        <Checkbox
          defaultChecked={false}
          onChange={(e) => handleCheckbox(`smallPackages.${index}.IsPacked`, e)}
        />
      ),
    },
    {
      dataIndex: "IsInsurance",
      title: "Bảo hiểm",
      align: "center",
      responsive: ["md"],
      render: (_, __, index) => (
        <Checkbox
          defaultChecked={false}
          onChange={(e) =>
            handleCheckbox(`smallPackages.${index}.IsInsurance`, e)
          }
        />
      ),
    },
    {
      dataIndex: "UserNote",
      title: "Ghi chú",
      align: "center",
      responsive: ["lg"],
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`smallPackages.${index}.UserNote`}
          placeholder=""
        />
      ),
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
              toast.warning("Phải có ít nhất 1 kiện ký gửi");
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
          <div className="extentable-content">
            <div className="extentable-row mb-2">
              <span className="extentable-label">Loại sản phẩm</span>
              <span className="extentable-value">
                <FormInput
                  control={control}
                  name={`smallPackages.${index}.Category`}
                  placeholder=""
                />
              </span>
            </div>
            <div className="extentable-row mb-2">
              <span className="extentable-label">Số lượng</span>
              <span className="extentable-value">
                <FormInputNumber
                  control={control}
                  name={`smallPackages.${index}.Amount`}
                  placeholder=""
                />
              </span>
            </div>
            <div className="extentable-row mb-2">
              <span className="extentable-label">Ghi chú</span>
              <span className="extentable-value">
                <FormInput
                  control={control}
                  name={`smallPackages.${index}.UserNote`}
                  placeholder=""
                />
              </span>
            </div>
            <div className="flex justify-between md:hidden">
              <div className="extentable-row flex w-fit">
                <span className="extentable-value mr-2">
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) =>
                      handleCheckbox(`smallPackages.${index}.IsCheckProduct`, e)
                    }
                  />
                </span>
                <span className="extentable-label">Kiểm hàng</span>
              </div>
              <div className="extentable-row flex w-fit">
                <span className="extentable-value mr-2">
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) =>
                      handleCheckbox(`smallPackages.${index}.IsPacked`, e)
                    }
                  />
                </span>
                <span className="extentable-label">Đóng gỗ</span>
              </div>
              <div className="extentable-row flex w-fit">
                <span className="extentable-value mr-2">
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) =>
                      handleCheckbox(`smallPackages.${index}.IsInsurance`, e)
                    }
                  />
                </span>
                <span className="extentable-label">Bảo hiểm</span>
              </div>
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
        title: "Danh sách kiện",
        expandable: expandable,
      }}
    />
  );
};
