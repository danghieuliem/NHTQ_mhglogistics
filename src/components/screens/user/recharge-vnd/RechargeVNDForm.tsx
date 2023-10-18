import { Image, Popover } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminSendUserWallet } from "~/api";
import {
  ActionButton,
  BankCard,
  FormInput,
  FormInputNumber,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { RootState } from "~/store";

type TProps = {
  bankCatalogue: TBankCatalogue[];
  newUser: any;
};

export const RechargeVNDForm: React.FC<TProps> = ({
  bankCatalogue,
  newUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState<any>(bankCatalogue[0]);
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const { control, handleSubmit, reset, resetField, watch } = useForm<
    TUserHistoryRechargeVND & {
      BankNumber: Number;
      Name: String;
      Branch: String;
    }
  >({
    mode: "onBlur",
    defaultValues: {
      TradeContent: `NAP ${newUser?.UserName} ${userCurrentInfo?.Phone}`,
      Amount: 1000,
    },
  });

  const queryClient = useQueryClient();
  const mutationAdd = useMutation(adminSendUserWallet.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("rechargeVNDList");
      toast.success("Gửi yêu cầu xác nhận chuyển khoản thành công");
      reset({
        Amount: 1000,
        TradeContent: `NAP ${newUser?.UserName} <sodienthoai>`,
        BankId: bankCatalogue?.[0]?.Id,
      });
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const _onPress = (data: TUserHistoryRechargeVND) => {
    if (data.Amount <= 0) {
      toast.warning("Số tiền yêu cầu nạp phải lớn hơn 0 đồng!");
      return;
    }
    if (!selectedBank?.Id) {
      toast.warn("Vui lòng chọn ngân hàng!");
      return;
    }
    setLoading(true);
    mutationAdd.mutateAsync({
      ...data,
      UID: newUser?.Id,
      BankId: selectedBank?.Id,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <span className="text-md block mb-2 font-bold uppercase text-[#595857] border-b border-[#f8dfd5]">
          DANH SÁCH NGÂN HÀNG
        </span>
        <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-1">
          {bankCatalogue.map((item) => {
            return (
              <BankCard
                item={item}
                key={item?.Id}
                setSelectedBank={setSelectedBank}
                selectedBank={selectedBank}
              />
            );
          })}
        </div>
      </div>

      <div className="col-span-2">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between pb-2 col-span-2 border-b border-[#f8dfd5]">
            <span className="block text-md mb-[-2rem] font-bold uppercase text-[#595857]">
              XÁC NHẬN CHUYỂN KHOẢN
            </span>
            <Popover
              trigger={"click"}
              placement="leftBottom"
              content={
                <Image
                  preview={false}
                  width={400}
                  src={`https://img.vietqr.io/image/${selectedBank?.BankName}-${selectedBank?.BankNumber}-print.jpg?amount=${
                    watch().Amount
                  }&addInfo=${
                    watch().TradeContent
                  }&accountName=${selectedBank?.Branch}`}
                />
              }
            >
              <ActionButton
                isButton
                icon="fas fa-qrcode mr-4"
                title="Mã QR"
                isButtonClassName="bg-main !text-white"
                disabled={!selectedBank?.BankName}
              />
            </Popover>
          </div>
          <div className="col-span-2 grid xs:grid-cols-2 grid-cols-1 gap-2">
            <FormInput
              control={control}
              name="BankInfo"
              placeholder={selectedBank?.BankName}
              required={false}
              label="Tên ngân hàng"
              disabled
            />
            <FormInput
              control={control}
              name="BankNumber"
              placeholder={selectedBank?.BankNumber}
              required={false}
              label="Số tài khoản"
              disabled
            />
            <FormInput
              control={control}
              name="Name"
              placeholder={selectedBank?.Name}
              required={false}
              label="Tên chi nhánh"
              disabled
            />
            <FormInput
              control={control}
              name="Branch"
              placeholder={selectedBank?.Branch}
              required={false}
              label="Chủ tài khoản"
              disabled
            />
            <FormInputNumber
              control={control}
              name="Amount"
              placeholder=""
              suffix=" VNĐ"
              label="Nhập số tiền (VNĐ)"
              rules={{ required: "Nhập số tiền cần nạp!" }}
            />
            <FormInput
              control={control}
              name="TradeContent"
              placeholder="Nội dung nạp tiền"
              label="Nội dung"
              hideError={true}
              rules={{ required: "Nhập nội dung nạp tiền!" }}
            />
            <IconButton
              showLoading
              onClick={handleSubmit(_onPress)}
              icon="fas fa-check-circle"
              title="Tạo"
              toolip=""
              btnClass="col-span-full !bg-green !text-white mt-4 py-2.5"
              disabled={loading || !selectedBank}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
