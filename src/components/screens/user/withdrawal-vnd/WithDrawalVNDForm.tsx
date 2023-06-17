import { Card } from "antd";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { user, withdraw } from "~/api";
import { FormInput, FormInputNumber, FormTextarea } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { useAppSelector } from "~/store";

export const WithDrawalVNDForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm<TWithDraw>({
    mode: "onBlur",
  });
  const queryClient = useQueryClient();
  const { current: newUser } = useAppSelector((state) => state.user);

  const { data, isError, refetch } = useQuery(
    ["clientData", newUser?.UserId],
    () => user.getByID(newUser?.UserId),
    {
      onSuccess: (data) => data,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      enabled: !!newUser,
    }
  );

  const mutationAdd = useMutation(withdraw.create, {
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries("articleList");
      queryClient.invalidateQueries("clientData");
      queryClient.invalidateQueries("withdrawList");
      mutationAdd.reset();
      toast.success("Gửi yêu cầu rút tiền thành công");
      reset({
        Amount: 0,
        BankNumber: null,
        Beneficiary: "",
        BankAddress: "",
        Note: "",
      });
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error);
      setLoading(false);
    },
  });

  const _onPress = (data: TWithDraw) => {
    if (data?.Amount === 0) {
      toast.warn("Số tiền rút phải lớn hơn 0 đồng!");
      return;
    }
    setLoading(true);
    mutationAdd.mutateAsync({
      ...data,
      Type: 2,
      UID: newUser?.UserId,
      Status: 1,
    });
  };

  return (
    <Card
      className="!border-none !m-[-10px]"
      extra={
        <div className="flex justify-between items-center">
          <span className="text-sec font-bold text-lg">
            Thông tin phiếu rút
          </span>
          <IconButton
            icon="fas fa-check-circle"
            title="Tạo"
            onClick={handleSubmit(_onPress)}
            showLoading
            toolip=""
            btnClass="bg-orange text-white ml-2"
          />
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-4 sm:col-span-2">
          <FormInputNumber
            required={true}
            control={control}
            name="Amount"
            label="Số tiền rút"
            placeholder=""
            rules={{
              required: "Vui lòng điền thông tin!",
              validate: {
                check: (value) => {
                  if (data?.Data?.Wallet === undefined) return true;
                  if (value > data?.Data?.Wallet) {
                    return "Số dư không đủ";
                  } else {
                    return true;
                  }
                },
              },
            }}
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <FormInput
            label="Số tài khoản"
            required={true}
            control={control}
            name="BankNumber"
            placeholder=""
            rules={{
              required: "Vui lòng điền thông tin!",
            }}
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <FormInput
            label="Người hưởng"
            required={true}
            control={control}
            name="Beneficiary"
            placeholder=""
            rules={{ required: "Vui lòng điền thông tin!" }}
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <FormInput
            label="Ngân hàng"
            control={control}
            name="BankAddress"
            placeholder=""
            required={true}
            rules={{ required: "Vui lòng điền thông tin!" }}
          />
        </div>
        <div className="col-span-4">
          <FormTextarea
            rows={2}
            control={control}
            name="Note"
            label="Nội dung"
            placeholder=""
          />
        </div>
      </div>
    </Card>
  );
};
