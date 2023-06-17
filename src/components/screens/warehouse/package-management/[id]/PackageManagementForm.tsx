import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { bigPackage } from "~/api";
import { FormInput, FormInputNumber, FormSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { toast } from "~/components/toast";
import { packageStatusData } from "~/configs/appConfigs";
import { useDeepEffect } from "~/hooks";

type TProps = {
  data: TPackage;
  loading: boolean;
};

export const PackageManagementForm: React.FC<TProps> = ({ data, loading }) => {
  const { handleSubmit, reset, control } = useForm<TPackage>({
    mode: "onBlur",
  });

  useDeepEffect(() => reset(data), [data]);

  const mutationUpdate = useMutation(bigPackage.update, {
    onSuccess: () => toast.success("Cập nhật bao hàng thành công"),
    onError: toast.error,
  });

  const _onPress = async (data: TPackage) => {
    try {
      await mutationUpdate.mutateAsync(data);
      router.back();
    } catch (error) {}
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="col-span-1">
        <FormInput
          control={control}
          name="Code"
          label="Mã bao hàng"
          placeholder=""
          rules={{ required: "Không bỏ trống mã bao hàng" }}
        />
      </div>
      <div className="col-span-1">
        <FormInputNumber
          control={control}
          name="Weight"
          label="Cân nặng (kg)"
          placeholder=""
          suffix=" kg"
          rules={{ required: "Không bỏ trống cân nặng" }}
        />
      </div>
      <div className="col-span-1">
        <FormInputNumber
          control={control}
          name="Volume"
          label="Khối (m3)"
          placeholder=""
          suffix=" m3"
          rules={{ required: "Không bỏ trống khối" }}
        />
      </div>
      <div className="col-span-">
        <FormSelect
          control={control}
          data={packageStatusData.slice(2, 3)}
          defaultValue={
            data?.Status && packageStatusData.find((x) => x.id === data?.Status)
          }
          name="Status"
          label="Trạng thái"
          placeholder=""
          rules={{ required: "Không bỏ trống trạng thái" }}
        />
      </div>
      <div className="col-span-1 flex border-t border-main pt-3 mt-3">
        <IconButton
          icon="fas fa-pencil"
          title="Cập nhật"
          onClick={handleSubmit(_onPress)}
          showLoading
          btnClass="!mr-2"
          toolip=""
        />
        <IconButton
          icon="fas fa-undo"
          title="Trở về"
          toolip=""
          yellow
          onClick={() => router.back()}
        />
      </div>
    </div>
  );
};
