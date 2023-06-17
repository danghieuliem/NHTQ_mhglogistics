import { Space } from "antd";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { feeSupport } from "~/api";
import {
  ActionButton,
  DataTable,
  FormInput,
  FormInputNumber,
  showToast,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { TColumnsType } from "~/types/table";

type TProps = {
  data: TOrder;
  loading: boolean;
  handleUpdate: (data: TOrder) => Promise<void>;
  RoleID: number;
};

export const OrderSurChargeList: React.FC<TProps> = ({
  data,
  loading,
  handleUpdate,
  RoleID,
}) => {
  const FeeSupports = data?.FeeSupports;
  const { control, reset, handleSubmit } = useFormContext<TOrder>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "FeeSupports",
  });

  const columns: TColumnsType<TFeeSupport> = [
    {
      dataIndex: "SupportName",
      title: "Tên phụ phí",
      align: "center",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`FeeSupports.${index}.SupportName` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required " }}
        />
      ),
    },
    {
      dataIndex: "SupportInfoVND",
      title: "Số tiền (VNĐ)",
      align: "center",
      render: (_, __, index) => (
        <FormInputNumber
          suffix=" VNĐ"
          control={control}
          name={`FeeSupports.${index}.SupportInfoVND` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required " }}
        />
      ),
      // responsive: ["lg"],
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      className: `${
        RoleID === 1 || RoleID === 3 || RoleID === 8 || RoleID === 6
          ? ""
          : "hidden"
      }`,
      render: (_, record: any, index) => {
        return (
          <Space>
            <ActionButton
              icon="fas fa-minus-circle"
              title="Xóa"
              onClick={() => {
                const item: any = FeeSupports?.find(
                  (x: any) => x?.Id === record?.Id
                );
                if (!!item) {
                  showToast({
                    title: "Thông tin",
                    message:
                      "Đang thực hiện việc, vui lòng đợi trong giây lát...",
                    type: "info",
                  });
                  feeSupport
                    .delete(item.Id)
                    .then(() => {
                      remove(index);
                      toast.success("Xoá phụ phí thành công");
                      handleSubmit(handleUpdate)();
                      // const newFeeSupports = FeeSupports.filter(itemx => itemx.Id !== item.Id)

                      // const newData = {
                      // 	...data,
                      // 	FeeSupports: newFeeSupports,
                      // };

                      // mutationUpdate.mutateAsync(newData);
                    })
                    .catch((error) =>
                      showToast({
                        title: (error as any)?.response?.data?.ResultCode,
                        message: (error as any)?.response?.data?.ResultMessage,
                        type: "error",
                      })
                    );
                } else {
                  remove(index);
                }
              }}
            />
          </Space>
        );
      },
      // responsive: ["xl"],
      width: 90,
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record, index) => (
  //     <ul className="px-2 text-xs">
  //       <li className="lg:hidden block py-2">
  //         <span className="font-medium mr-4">SỐ TIỀN (VNĐ):</span>
  //         <FormInputNumber
  //           suffix=" VNĐ"
  //           control={control}
  //           name={`FeeSupports.${index}.SupportInfoVND` as const}
  //           defaultValue={fields[index].SupportInfoVND}
  //           placeholder=""
  //           hideError
  //           rules={{ required: "This field is required " }}
  //         />
  //       </li>
  //       <li className="xl:hidden block py-2">
  //         <span className="font-medium mr-4">THAO TÁC:</span>
  //         <ActionButton
  //           icon="fas fa-minus-circle"
  //           title="Xóa"
  //           onClick={() => {
  //             const item: any = FeeSupports.find(
  //               (x: any) => x?.Id === record?.Id
  //             );
  //             if (!!item) {
  //               showToast({
  //                 title: "Thông tin",
  //                 message:
  //                   "Đang thực hiện việc, vui lòng đợi trong giây lát...",
  //                 type: "info",
  //               });
  //               feeSupport
  //                 .delete(item.Id)
  //                 .then(() => {
  //                   remove(index);
  //                   showToast({
  //                     title: "200",
  //                     message: "Xoá phụ phí thành công",
  //                     type: "success",
  //                   });
  //                 })
  //                 .catch((error) =>
  //                   showToast({
  //                     title: (error as any)?.response?.data?.ResultCode,
  //                     message: (error as any)?.response?.data?.ResultMessage,
  //                     type: "error",
  //                   })
  //                 );
  //             } else {
  //               remove(index);
  //             }
  //           }}
  //         />
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <div className="mb-4">
      <div className="mb-4 text-base font-bold py-2 uppercase border-b border-main">
        Danh sách phụ phí
      </div>
      <DataTable
        rowKey={"id" as any}
        columns={columns}
        data={fields}
        style="secondary"
        className="!m-[-0.5rem]"
        // expandable={expandable}
      />
      {(RoleID === 1 ||
        RoleID === 3 ||
        (RoleID === 4 && data?.Status !== 5) ||
        RoleID === 8 ||
        RoleID === 6) && (
        <IconButton
          icon="fas fa-plus"
          title="Tạo"
          onClick={() =>
            append({
              SupportInfoVND: 0,
              MainOrderId: 0,
              Id: 0,
              SupportName: "",
            })
          }
          btnClass="mt-4"
          showLoading
          toolip=""
        />
      )}
    </div>
  );
};
