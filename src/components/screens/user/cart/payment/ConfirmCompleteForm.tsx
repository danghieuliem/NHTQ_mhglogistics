import { ActionButton } from "~/components/globals/button/ActionButton";
import { FormCheckbox } from "~/components/globals/formBase";
import { TControl } from "~/types/field";
import { _format } from "~/utils";
import { ReceiveInfoForm } from "./ReceiveInfoForm";

type TProps = TControl<TUserPayment> & {
  onPress: () => void;
  totalPrice: number | null;
  loadingPayment?: boolean;
  warehouseTQ?: TBaseReponseParams[];
  warehouseVN?: TBaseReponseParams[];
  shippingTypeToWarehouse?: TBaseReponseParams[];
  userPayment: any;
};

export const ConfirmCompleteForm: React.FC<TProps> = ({
  control,
  onPress,
  totalPrice,
  loadingPayment,
  warehouseTQ,
  warehouseVN,
  shippingTypeToWarehouse,
  userPayment,
}) => {
  if (!totalPrice) return null;

  return (
    <div className=" grid grid-cols-12 gap-2 p-4">
      <ReceiveInfoForm
        control={control}
        warehouseVN={warehouseVN}
        shippingTypeToWarehouse={shippingTypeToWarehouse}
        warehouseTQ={warehouseTQ}
        userPayment={userPayment}
      />
      <div className="flex items-center col-span-4 justify-end">
        <div className="grid grid-cols-1 gap-2 h-fit">
          <div className="flex justify-end items-center">
            <span className="!text-label text-[20px] font-bold uppercase leading-[initial]">
              Tổng tiền:
            </span>
            <span className="font-bold text-orange text-[22px] ml-4">
              {totalPrice && _format.getVND(totalPrice)}
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
            <ActionButton
              icon="fas fa-hand-point-right"
              title="Hoàn thành"
              isButton
              onClick={onPress}
              isButtonClassName="bg-blue !text-white text-[16px] !px-4 !py-2 rounded-[4px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
