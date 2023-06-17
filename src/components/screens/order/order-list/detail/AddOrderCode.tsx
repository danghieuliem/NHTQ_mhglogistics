import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { IconButton, FormInput } from "~/components";

type TForm = {
  code: string;
};

type TProps = {
  add: (value: string) => Promise<any>;
  statusData: number;
  roleID: number;
};

export const AddOrderCode: React.FC<TProps> = ({ add, statusData, roleID }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TForm>();

  const queryClient = useQueryClient();
  const _onPress = async (data: TForm) => {
    try {
      await add(data.code);
      queryClient.invalidateQueries("order-list");
      reset({ code: null });
    } catch (error) {}
  };

  return (
    <div className={clsx("flex", errors.code ? "items-start" : "items-center")}>
      <FormInput
        control={control}
        name="code"
        placeholder="Mã đơn hàng"
        rules={{
          required: "Không bỏ trống mã đơn hàng",
          validate: (val: string) =>
            !val.trim().length ? "This field is required" : true,
        }}
        inputContainerClassName="max-w-[300px]"
      />
      <IconButton
        title="Thêm"
        showLoading
        onClick={handleSubmit(_onPress)}
        icon="fas fa-plus"
        btnClass="ml-4"
        toolip={"Thêm"}
        disabled={roleID === 4 && statusData === 0}
      />
    </div>
  );
};
