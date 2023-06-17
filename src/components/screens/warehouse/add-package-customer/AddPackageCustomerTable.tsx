import { Input } from "antd";
import clsx from "clsx";
import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  FormInputNumber,
  Button,
  FormTextarea,
  ActionButton,
  DataTable,
  FormUpload,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { FormInput, FormSelect } from "~/components/globals/formBase";
import { smallPackageStatusData } from "~/configs/appConfigs";
import { TControl } from "~/types/field";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const AddPackageCustomerTable: React.FC<
  TTable<TWarehouseVN> &
    TControl<{ [key: string]: TWarehouseVN[] }> & {
      name: string;
      onPress: (data: TWarehouseVN[]) => void;
      onHide: (data: TWarehouseVN[]) => void;
    }
> = ({ data, onPress, onHide, handleSubmit, name, control }) => {
  const {} = useFieldArray({ name, control, keyName: "Id" });

  const columns: TColumnsType<TWarehouseVN> = [
    {
      dataIndex: "Id",
      align: "center",
      title: "Order ID",
      render: () => 0,
    },
    {
      dataIndex: "OrderType",
      align: "center",
      title: "Loại ĐH",
      render: () => "Kiện chưa xác định",
      responsive: ["sm"],
    },
    {
      dataIndex: "IsCheckProduct",
      align: "center",
      title: "Đơn hàng",
      render: (_, record) => (
        <div className="flex justify-center flex-col">
          <div className="mx-1 flex items-center justify-between">
            <p className="font-medium mr-1">KĐ</p>
            {record.IsCheckProduct ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="mx-1 flex items-center justify-between">
            <p className="font-medium mr-1">ĐG</p>
            {record.IsPackged ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="mx-1 flex items-center justify-between">
            <p className="font-medium mr-1">BH</p>
            {record.IsInsurance ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
        </div>
      ),
      responsive: ["sm"],
    },
    {
      dataIndex: "OrderTransactionCode",
      align: "center",
      title: "Mã vận đơn",
    },
    {
      dataIndex: "Weight",
      align: "center",
      title: "Cân nặng (kg)",
      render: (weight, _) => {
        return (
          <Input
            placeholder=""
            value={_format.getVND(weight, "")}
            className="max-w-[60px] h-[30px] text-center"
            // onEnter={() => onPress([data[index]])}
            disabled
          />
        );
      },
      responsive: ["md"],
    },
    {
      dataIndex: "Width",
      align: "center",
      title: "Kích thước",
      render: (_, __, index) => (
        <React.Fragment>
          <div className="flex items-center">
            d:
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Length` as any}
              placeholder=""
              inputClassName="max-w-[60px] h-[30px] text-center"
              // onEnter={() => onPress([data[index]])}
              disabled
            />
          </div>
          <div className="flex items-center my-2">
            r:
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Width` as any}
              placeholder=""
              inputClassName="max-w-[60px] h-[30px] text-center"
              // onEnter={() => onPress([data[index]])}
              disabled
            />
          </div>
          <div className="flex items-center">
            c:
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Height` as any}
              placeholder=""
              inputClassName="max-w-[60px] h-[30px] text-center"
              // onEnter={() => onPress([data[index]])}
              disabled
            />
          </div>
        </React.Fragment>
      ),
      responsive: ["md"],
    },
    {
      dataIndex: "UserNote",
      align: "center",
      title: "Ghi chú",
      width: 160,
      render: (_, __, index) => (
        <FormTextarea
          rows={2}
          control={control}
          name={`${name}.${index}.UserNote` as any}
          placeholder=""
        />
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "StaffNoteCheck",
      align: "center",
      title: "Khách ghi chú",
      width: 160,
      render: (_, __, index) => (
        <FormTextarea
          rows={2}
          control={control}
          name={`${name}.${index}.StaffNoteCheck` as any}
          placeholder=""
        />
      ),
      responsive: ["lg"],
    },
    {
      dataIndex: "IMG",
      align: "center",
      title: "Hình ảnh",
      render: (_, __, index) => (
        <FormUpload
          control={control}
          name={`${name}.${index}.IMG` as any}
          image
        />
      ),
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: () => <div className="text-center">Trạng thái</div>,
      render: (_, __, index) => (
        // <FormInput
        // 	control={control}
        // 	name={`${name}.${index}.StatusName` as any}
        // 	placeholder={__.StatusName}
        // 	disabled
        // />
        <FormSelect
          control={control}
          name={`${name}.${index}.Status` as any}
          data={[smallPackageStatusData[1]]}
          disabled
          defaultValue={smallPackageStatusData[1]}
          placeholder="Chọn trạng thái"
        />
      ),
      responsive: ["xl"],
    },
    {
      dataIndex: "OrderTransactionCode",
      align: "center",
      title: "Thao tác",
      render: (_, __, index) => (
        <React.Fragment>
          <ActionButton
            icon="fas fa-sync-alt"
            onClick={() => onPress([data[index]])}
            title="Cập nhật"
          />
          <ActionButton
            icon="fas fa-eye-slash"
            onClick={() => onHide([data[index]])}
            title="Ẩn đi"
          />
        </React.Fragment>
      ),
      responsive: ["xl"],
    },
  ];

  const expandable = {
    expandedRowRender: (record, index) => (
      <ul className="px-2 text-xs">
        <li className="sm:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Loại ĐH:</span>
          {record.OrderType}
        </li>
        <li className="sm:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Đơn hàng:</span>
          <div className="flex justify-center">
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
        </li>
        <li className="md:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Cân nặng:</span>
          {record.Weight && _format.getVND(record.Weight, "")}
        </li>
        <li className="md:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Kích thước:</span>
          <React.Fragment>
            <div className="flex items-center">
              d:
              <FormInputNumber
                control={control}
                name={`${name}.${index}.Length` as any}
                placeholder=""
                inputClassName="max-w-[60px] h-[30px] text-center"
                onEnter={() => onPress([data[index]])}
              />
            </div>
            <div className="flex items-center mx-[8px]">
              r:
              <FormInputNumber
                control={control}
                name={`${name}.${index}.Width` as any}
                placeholder=""
                inputClassName="max-w-[60px] h-[30px] text-center"
                onEnter={() => onPress([data[index]])}
              />
            </div>
            <div className="flex items-center">
              c:
              <FormInputNumber
                control={control}
                name={`${name}.${index}.Height` as any}
                placeholder=""
                inputClassName="max-w-[60px] h-[30px] text-center"
                onEnter={() => onPress([data[index]])}
              />
            </div>
          </React.Fragment>
        </li>
        <li className="lg:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Ghi chú:</span>
          <FormTextarea
            rows={2}
            control={control}
            name={`${name}.${index}.UserNote` as any}
            placeholder=""
          />
        </li>
        <li className="lg:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Khách ghi chú:</span>
          <FormTextarea
            rows={2}
            control={control}
            name={`${name}.${index}.StaffNoteCheck` as any}
            placeholder=""
          />
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Hình ảnh:</span>
          <FormUpload
            control={control}
            name={`${name}.${index}.IMG` as any}
            image
          />
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Trạng thái:</span>
          <FormSelect
            control={control}
            name={`${name}.${index}.Status` as any}
            data={[smallPackageStatusData[2]]}
            disabled
            defaultValue={smallPackageStatusData[2]}
            placeholder="Chọn trạng thái"
          />
        </li>
        <li className="xl:hidden justify-between flex py-2">
          <span className="font-medium mr-4">Thao tác:</span>
          <div>
            <ActionButton
              icon="fas fa-sync-alt"
              onClick={() => onPress([data[index]])}
              title="Cập nhật"
            />
            <ActionButton
              icon="fas fa-eye-slash"
              onClick={() => onHide([data[index]])}
              title="Ẩn đi"
            />
          </div>
        </li>
      </ul>
    ),
  };

  return (
    <React.Fragment>
      <div className="mt-8">
        <div className="lg:flex items-center justify-between mb-3">
          <div className="lg:flex order-last">
            <IconButton
              onClick={() => onHide(data)}
              btnClass={"mr-4 mb-4 lg:mb-0"}
              title="Ẩn tất cả"
              icon="fas fa-eye-slash"
              toolip=""
            />
            <IconButton
              onClick={() => onPress(data)}
              btnClass="mb-4 lg:mb-0"
              icon="fas fa-edit"
              title="Cập nhật tất cả"
              toolip=""
            />
          </div>
          <div className="flex items-center">
            <div className="max-w-[400px] px-4 bg-[#f6ded5] text-[#f0916b] py-[10px] text-sm font-bold uppercase">
              {`Mã vận đơn | ${data[0]?.OrderTransactionCode}`}
            </div>
            <span className="ml-4 text-green text-xs font-semibold">
              Bạn đã quét{" "}
              <span className="text-orange text-sm">{data.length}</span> kiện
            </span>
          </div>
        </div>

        <DataTable
          data={data}
          columns={columns}
          bordered
          expandable={expandable}
        />
      </div>
    </React.Fragment>
  );
};
