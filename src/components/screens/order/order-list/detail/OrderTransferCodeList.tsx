import { Space } from "antd";
import router from "next/router";
import React, { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { smallPackage } from "~/api";
import {
  ActionButton,
  DataTable,
  FilterSelect,
  FormCheckbox,
  FormInput,
  FormInputNumber,
  FormSelect,
  IconButton,
} from "~/components";
import {
  ESmallPackageStatusData,
  smallPackageStatusData,
} from "~/configs/appConfigs";
import { TColumnsType } from "~/types/table";

type TProps = {
  data: TOrder;
  loading: boolean;
  handleUpdate: (data: TOrder) => Promise<void>;
  RoleID: number;
};

export const OrderTransferCodeList: React.FC<TProps> = ({
  data,
  loading,
  handleUpdate,
  RoleID,
}) => {
  const { control, watch, handleSubmit } = useFormContext<TOrder>();
  const formValue = useMemo(() => watch(), [watch() as TOrder]);
  const SmallPackages = data?.SmallPackages;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "SmallPackages",
  });

  const columns: TColumnsType<TSmallPackage> = [
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      render: (_, __, index) => {
        return (
          <>
            <FormInput
              control={control}
              name={`SmallPackages.${index}.OrderTransactionCode` as const}
              placeholder=""
              hideError
              disabled={
                !(
                  RoleID === 1 ||
                  RoleID === 3 ||
                  RoleID === 4 ||
                  RoleID === 8 ||
                  RoleID === 6
                )
              }
              rules={{ required: "This field is required" }}
            />
          </>
        );
      },
      fixed: "left",
      width: 200,
    },
    {
      dataIndex: "MainOrderCodeId",
      title: "Mã đơn hàng",
      render: (_, __, index) => (
        <FormSelect
          control={control}
          data={formValue.MainOrderCodes}
          name={`SmallPackages.${index}.MainOrderCodeId` as const}
          select={{ label: "Code", value: "Id" }}
          defaultValue={SmallPackages?.[index]}
          placeholder=""
          hideError
          disabled={
            !(
              RoleID === 1 ||
              RoleID === 3 ||
              RoleID === 4 ||
              RoleID === 8 ||
              RoleID === 6
            )
          }
          rules={{ required: "This field is required" }}
        />
      ),
      width: 180,
    },
    {
      dataIndex: "Weight",
      align: "center",
      title: () => <>Cân nặng</>,
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`SmallPackages.${index}.Weight` as const}
          placeholder=""
          // disabled
          suffix=" Kg"
          disabled={!(RoleID === 1 || RoleID === 3)}
          allowNegative={false}
          hideError
          rules={{ required: "This field is required" }}
          // inputContainerClassName="max-w-[50px] mx-auto"
          inputClassName="text-center"
        />
      ),
      width: 100,
    },
    {
      dataIndex: "VolumePayment",
      align: "center",
      title: () => <>Thể tích</>,
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`SmallPackages.${index}.VolumePayment` as const}
          placeholder=""
          disabled
          suffix=" m3"
          // disabled={!(RoleID === 1 || RoleID === 3 || RoleID === 4)}
          allowNegative={false}
          hideError
          rules={{ required: "This field is required" }}
          // inputContainerClassName="max-w-[50px] mx-auto"
          inputClassName="text-center"
        />
      ),
      width: 100,
    },
    {
      dataIndex: "LWH",
      align: "center",
      title: () => <>Kích thước</>,
      render: (_, __, index) => (
        <FormInput
          control={control}
          disabled
          name={`SmallPackages.${index}.LWH` as const}
          placeholder=""
          hideError
          // inputContainerClassName="w-[120px] mx-auto"
          inputClassName="text-center"
        />
      ),
      width: 140,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (_, __, index) => (
        <FormSelect
          control={control}
          name={`SmallPackages.${index}.Status` as const}
          data={smallPackageStatusData}
          defaultValue={
            fields[index]?.Status &&
            smallPackageStatusData.find((x) => x.id === fields[index]?.Status)
          }
          disabled={
            !(
              RoleID === 1 ||
              RoleID === 3 ||
              RoleID === 4 ||
              RoleID === 8 ||
              RoleID === 6
            )
          }
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
      width: 180
    },
    {
      dataIndex: "Description",
      title: "Ghi chú",
      render: (_, record: any, index) => (
        <FormInput
          disabled={
            !(
              RoleID === 1 ||
              RoleID === 3 ||
              RoleID === 4 ||
              RoleID === 8 ||
              RoleID === 6
            )
          }
          control={control}
          name={`SmallPackages.${index}.Description` as const}
          placeholder=""
          hideError
        />
      ),
      width: 120
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      width: 80,
      render: (_, record, index) => {
        return (
          <Space>
            <ActionButton
              icon="fas fa-trash-alt"
              title="Xoá"
              isButton
              isButtonClassName="bg-red !text-white"
              disabled={
                !(
                  RoleID === 1 ||
                  RoleID === 3 ||
                  RoleID === 4 ||
                  RoleID === 8 ||
                  RoleID === 6
                )
              }
              onClick={() => {
                const item: any = SmallPackages?.find(
                  (x: any) => x?.Id === record.Id
                );
                if (!!item) {
                  const id = toast.loading("Đang xử lý ...");
                  smallPackage
                    .delete(item.Id)
                    .then(() => {
                      remove(index);
                      toast.update(id, {
                        render: "Xoá mã vận đơn thành công",
                        isLoading: false,
                        autoClose: 0,
                        type: "success",
                      });
                      handleSubmit(handleUpdate)();
                    })
                    .catch((error) => {
                      toast.update(id, {
                        render: "Đã xảy ra lỗi!",
                        isLoading: false,
                        autoClose: 0,
                        type: "error",
                      });
                    });
                } else {
                  remove(index);
                }
              }}
            />
            {/* <ActionButton
              icon="fas fa-plus"
              title="Thêm"
              disabled={!(RoleID === 1 || RoleID === 3 || RoleID === 4)}
              onClick={handleSubmit(handleUpdate)}
            /> */}
          </Space>
        );
      },
    },
  ];

  const onExportExcel = async (data: TOrder) => {
    try {
      const res = await smallPackage.exportExcel({
        MainOrderId: data.Id,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <React.Fragment>
      <DataTable
        {...{
          columns: columns,
          data: fields,
          style: "detailOrder",
          bordered: true,
          rowKey: "id" as any,
        }}
      />
      {(RoleID === 1 ||
        RoleID === 3 ||
        RoleID === 4 ||
        RoleID === 8 ||
        RoleID === 6) && (
        <div className="flex items-center m-2 justify-between">
          <div>
            <IconButton
              title="Tạo"
              btnClass="!mr-4"
              icon="fas fa-plus"
              onClick={() => {
                append({
                  Status: ESmallPackageStatusData.New,
                  MainOrderCodeId: data?.MainOrderCodes?.[0]?.Id,
                  MainOrderId: data?.Id,
                  Weight: 0,
                  VolumePayment: 0,
                });
              }}
              showLoading
              toolip=""
              disabled={RoleID === 4 && data?.Status === 0}
            />
            <FormCheckbox
              control={control}
              name="IsDoneSmallPackage"
              label="Đủ mã vận đơn"
            />
          </div>
          <IconButton
            onClick={() => onExportExcel(data)}
            title="Xuất"
            icon="fas fa-file-export"
            showLoading
            toolip="Xuất thống kê"
            green
          />
        </div>
      )}
    </React.Fragment>
  );
};
