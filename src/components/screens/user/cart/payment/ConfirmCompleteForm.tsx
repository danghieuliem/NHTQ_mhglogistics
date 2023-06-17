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
    <div className="tableBox">
      <div className="flex justify-between mb-4 ">
        <h2 className="!mb-0 text-[#141046] font-semibold">Tổng tiền</h2>
        <span className="font-bold text-orange text-[18px]">
          {totalPrice && _format.getVND(totalPrice)}
        </span>
      </div>
      <FormCheckbox
        label="Tôi đồng ý với các điều khoản"
        control={control}
        name="IsAgreement"
        // rules={{ required: 'Vui lòng xác nhận trước khi thanh toán' }}
      />
      <div className="text-label my-4 text-[#fa8d14]">
        Vui lòng xác nhận trước khi hoàn tất đơn hàng.
      </div>
      <div className="flex justify-end">
        <IconButton
          btnClass="w-[120px] text-white py-2 rounded-xl bg-[#f8dfd5]"
          showLoading
          onClick={onPress}
          title="Hoàn tất"
          icon={
            loadingPayment ? "fas fa-spinner fa-pulse" : "fas fa-check-circle"
          }
          toolip={""}
          green
          disabled={loadingPayment}
        />
      </div>
    </div>
  );
};
