import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { adminSendUserWallet } from "~/api";
import {
  FormAsyncSelect,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormTextarea,
  IconButton,
  toast,
} from "~/components";
import { paymentStatusData } from "~/configs/appConfigs";
import { useDeepEffect } from "~/hooks";

type TProps = {
  userData?: TEmployee;
  bankData?: TBankCatalogue[];
  loading: boolean;
};

export const VietNamRechargeForm: React.FC<TProps> = ({
  userData,
  bankData,
  loading,
}) => {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<TUserHistoryRechargeVND>({
    mode: "onBlur",
  });

  useDeepEffect(() => {
    if (!!userData && !!bankData?.length) {
      reset({
        UID: userData.Id,
        UserName: userData.UserName,
        Wallet: userData.Wallet,
        BankId: bankData[0].Id,
        Status: paymentStatusData[1].id,
      });
    }
  }, [userData, bankData]);

  const queryClient = useQueryClient();

  const mutationUpdate = useMutation(adminSendUserWallet.create, {
    onSuccess: (_, data) => {
      queryClient.invalidateQueries("clientData");
      queryClient.invalidateQueries("withdrawList");
      toast.success(
        data.Status === 2
          ? `Nạp tiền vào ví cho khách ${data.UserName} thành công số tiền ${data.Amount} vnđ`
          : `Tạo yêu cầu nạp tiền thành công cho khách ${data.UserName} số tiền ${data.Amount} vnđ`
      );
    },
    onError: toast.error,
  });

  const _onPress = async (data: TUserHistoryRechargeVND) => {
    mutationUpdate.mutateAsync(data);
    router.back();
  };

  return (
    <div className="flex gap-4">
      <div className="col-span-1 w-1/2 grid grid-cols-1 gap-4 content-start">
        <div className="col-span-1">
          <FormInput
            control={control}
            name="UserName"
            placeholder=""
            disabled
            label="Username"
            rules={{ required: "This field is required" }}
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInputNumber
            control={control}
            name="Wallet"
            placeholder=""
            disabled
            label="Ví tiền (VNĐ)"
            suffix=" VNĐ"
            required={false}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="col-span-1">
          <FormInputNumber
            control={control}
            name="Amount"
            placeholder="Nhập số tiền cần nạp"
            label="Số tiền (VNĐ)"
            suffix=" VNĐ"
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="col-span-1 text-left">
          <IconButton
            title="Cập nhật"
            onClick={handleSubmit(_onPress)}
            showLoading
            icon="fas fa-pencil"
            btnClass="!mr-2"
            btnIconClass="!mr-2"
            toolip=""
          />
          <IconButton
            onClick={() => router.back()}
            icon="fas fa-undo-alt"
            title="Trở về"
            showLoading
            btnIconClass="!mr-2"
            toolip=""
          />
        </div>
      </div>
      <div className="col-span-1 w-1/2 grid grid-cols-1 gap-4 content-start">
        <div className="col-span-1">
          <FormAsyncSelect
            control={control}
            name="BankId"
            data={{ options: bankData }}
            // defaultValue={bankData?.[0]}
            select={{ label: "BankInfo", value: "Id" }}
            placeholder="Chọn ngân hàng nạp tiền"
            label="Ngân hàng"
            required={false}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            control={control}
            name="Status"
            data={paymentStatusData.slice(1, 3)}
            // defaultValue={paymentStatusData[1]}
            placeholder="Chọn trạng thái"
            label="Trạng thái"
            rules={{ required: "This field is required" }}
            menuPlacement="top"
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormTextarea
            control={control}
            name="TradeContent"
            label="Nội dung"
            placeholder=""
            required={false}
          />
        </div>
      </div>
    </div>
  );
};
