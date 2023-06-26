import { IconButton } from "~/components/globals/button/IconButton";
import { FormCheckbox } from "~/components/globals/formBase";
import { TControl } from "~/types/field";
import { _format } from "~/utils";

type TProps = TControl<TUserPayment> & {
  onPress: () => void;
  totalPrice: number | null;
  loadingPayment?: boolean;
};

export const ConfirmCompleteForm: React.FC<TProps> = ({
  control,
  onPress,
  totalPrice,
  loadingPayment,
}) => {
  if (!totalPrice) return null;

  return (
    <div className="mt-[30px] grid grid-cols-1 gap-2">
      <div className="flex justify-end items-center">
        <span className="!text-label text-[16px] font-bold uppercase leading-[initial]">Tổng tiền</span>
        <span className="font-bold text-orange text-[16px] ml-4">
          {totalPrice && _format.getVND(totalPrice, " ")}
        </span>
      </div>
      <FormCheckbox
        label="Tôi đồng ý với các điều khoản"
        control={control}
        name="IsAgreement"
        checkBoxClassName="justify-end !text-[#6A6A6A]"
        // rules={{ required: 'Vui lòng xác nhận trước khi thanh toán' }}
      />
      <div className="text-main !text-[16px] text-right">
        Vui lòng xác nhận trước khi hoàn tất.
      </div>
      <div className="flex justify-end">
        <IconButton
          btnClass="px-6 text-white py-3 rounded-[6px] hover:!bg-blue"
          showLoading
          onClick={onPress}
          title="Hoàn tất"
          icon={""}
          toolip={""}
          green
          disabled={loadingPayment}
        />
      </div>
    </div>
  );
};
