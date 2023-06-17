import { Popconfirm } from "antd";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { mainOrderCode } from "~/api";
import { ActionButton, FormInput } from "~/components";
import { toast } from "~/components/toast";
import { AddOrderCode } from "./AddOrderCode";

type TProps = {
  data: TOrder;
  loading: boolean;
  refetch?: any;
  isAdmin?: boolean;
  RoleID: number;
};

export const OrderCode: React.FC<TProps> = ({
  data,
  loading,
  refetch,
  RoleID,
}) => {
  const { control, getValues } = useFormContext<TOrder>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "MainOrderCodes",
  });

  return (
    <React.Fragment>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex items-center mb-4">
            <FormInput
              control={control}
              name={`MainOrderCodes.${index}.Code` as const}
              placeholder=""
              disabled
            />
            {(RoleID === 1 ||
              RoleID === 3 ||
              RoleID === 4 ||
              RoleID === 8 ||
              RoleID === 6) && (
              <Popconfirm
                placement="topLeft"
                title="Bạn có muốn xoá mã đơn hàng này?"
                onConfirm={() => {
                  toast.info(
                    "Đang thực hiện việc xoá, vui lòng đợi trong giây lát..."
                  );
                  mainOrderCode
                    .delete(field.Id)
                    .then(() => {
                      remove(index);
                      toast.success("Xoá mã vận đơn thành công");
                      refetch();
                    })
                    .catch(toast.error);
                }}
                okText="Yes"
                cancelText="No"
              >
                <ActionButton
                  iconContainerClassName="ml-2 border-none"
                  icon="fas fa-minus-circle"
                  title="Xóa"
                  disabled={RoleID === 4 && data?.Status === 0}
                />
              </Popconfirm>
            )}
          </div>
        );
      })}
      {(RoleID === 1 ||
        RoleID === 3 ||
        RoleID === 4 ||
        RoleID === 8 ||
        RoleID === 6) && (
        <AddOrderCode
          roleID={RoleID}
          statusData={data?.Status}
          add={async (Code: string) => {
            if (
              !fields.find((x) => x.Code.toLowerCase() === Code.toLowerCase())
            ) {
              await mainOrderCode
                .create({ MainOrderId: data?.Id, Code })
                .then((res) => append(res?.Data))
                .catch(toast.error);
            } else {
              toast.warning("Đã trùng mã đơn hàng");
            }
          }}
        />
      )}
    </React.Fragment>
  );
};
