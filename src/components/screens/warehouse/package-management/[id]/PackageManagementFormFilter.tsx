import { Skeleton } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { smallPackage } from "~/api";
import { ActionButton } from "~/components/globals/button/ActionButton";
import { FilterInput } from "~/components/globals/filterBase";
import { FormInput } from "~/components/globals/formBase";

type TProps = {
  handleFilter: (code: string) => void;
  loading: boolean;
  data;
  refetch;
};

const InputSearchTransactionCode = ({ BigPackageId, refetch }) => {
  const { control, handleSubmit, getValues, reset, resetField, setValue } =
    useForm<TWarehouseCN>({
      mode: "onBlur",
      defaultValues: {
        OrderTransactionCode: "",
      },
    });

  const mutationUpdate = useMutation(smallPackage.update);

  const handleUpdate = (data) => {
    smallPackage
      .getByTransactionCode({ TransactionCode: data.OrderTransactionCode.trim() })
      .then((res) => {
        const sendData = { ...res?.Data[0], BigPackageId: BigPackageId };

        const id = toast.loading("Đang xử lý...");
        mutationUpdate
          .mutateAsync([sendData])
          .then(() => {
            toast.update(id, {
              render: "Gán vào bao thành công!",
              type: "success",
              autoClose: 500,
              isLoading: false,
            });
            refetch();
            resetField("OrderTransactionCode");
          })
          .catch((error) => {
            toast.update(id, {
              render: (error as any)?.response?.data?.ResultMessage,
              type: "error",
              autoClose: 1000,
              isLoading: false,
            });
          });
      });
  };

  return (
    <div className="flex mr-6 items-end gap-4">
      <FormInput
        control={control}
        name="OrderTransactionCode"
        placeholder="Mã vận đơn"
        label="Thêm vào bao"
      />

      <ActionButton
        icon=""
        isButton
        title="Thêm"
        isButtonClassName="bg-blue !text-white"
        onClick={handleSubmit(handleUpdate)}
      />
    </div>
  );
};

export const PackageManagementFormFilter: React.FC<TProps> = ({
  handleFilter,
  loading,
  data,
  refetch,
}) => {
  return (
    <div className="flex gap-4 items-end">
      <Skeleton
        loading={loading}
        title={false}
        paragraph={{ rows: 1, width: "100%" }}
      >
        <FilterInput
          placeholder="Mã vận đơn"
          label="Tìm mã vận đơn"
          id="code"
          name="cde"
          inputClassName="barcode"
          handleSubmit={handleFilter}
          allowClear={false}
        />
        <InputSearchTransactionCode BigPackageId={data?.Id} refetch={refetch} />
      </Skeleton>
    </div>
  );
};
