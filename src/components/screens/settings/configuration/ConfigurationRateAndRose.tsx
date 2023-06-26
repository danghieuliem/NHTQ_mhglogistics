import React, { FC } from "react";
import { Control } from "react-hook-form";
import { FormInputNumber } from "~/components";

type TProps<T extends object = object> = {
  control: Control<T, object>;
  data: T;
};

export const ConfigurationRateAndRose: FC<TProps<TConfig3>> = ({
  control,
  data,
}) => {
  return (
    <React.Fragment>
      <div className="">
        <p className="text-xs" style={{ color: "red" }}>
          * KHÔNG ĐƯỢC ĐỂ TRỐNG!
        </p>

        <div className="grid grid-cols-3 gap-4 my-5">
          <div className="col-span-1">
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="Currency"
                label="Tỉ giá mua hộ"
                placeholder=""
                // required={false}
                rules={{ required: "Không bỏ trống!" }}
              />
            </div>
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="SalePayHelpPersent"
                label="Hoa hồng mua hộ"
                suffix=" %"
                // required={false}
                placeholder=""
                rules={{
                  required: "Không bỏ trống!",
                }}
              />
            </div>
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="AgentCurrency"
                label="Tỉ giá ký gửi"
                // required={false}
                placeholder=""
                rules={{ required: "Không bỏ trống!" }}
              />
            </div>
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="PricePayHelpDefault"
                label="Tỉ giá thanh toán hộ"
                // required={false}
                placeholder=""
                rules={{
                  required: "Không bỏ trống!",
                }}
              />
            </div>
          </div>
          <div className="span-col-1">
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="SalePercent"
                label="Nhân viên sale trong 3 tháng đầu"
                suffix=" %"
                // required={false}
                placeholder=""
                rules={{
                  required: "Không bỏ trống!",
                }}
              />
            </div>
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="SalePercentAfter3Month"
                label="Nhân viên sale sau 3 tháng"
                suffix=" %"
                placeholder=""
                // required={false}
                rules={{
                  required: "Không bỏ trống!",
                }}
              />
            </div>
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="DatHangPercent"
                label="Nhân viên đặt hàng"
                suffix=" %"
                placeholder=""
                // required={false}
                rules={{
                  required: "Không bỏ trống!",
                }}
              />
            </div>
          </div>

          <div className="span-col-1">
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="InsurancePercent"
                label="Tiền bảo hiểm đơn hàng"
                // required={false}
                suffix=" %"
                placeholder=""
                rules={{
                  required: "Không bỏ trống!",
                }}
              />
            </div>
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="NumberLinkOfOrder"
                label="Số lượng link trong 1 đơn"
                // required={false}
                placeholder=""
                rules={{ required: "Không bỏ trống!" }}
              />
            </div>
            <div className="mb-3">
              <FormInputNumber
                control={control}
                name="RemoveCartDay"
                label="Số ngày tự động xoá giỏ hàng"
                // required={false}
                placeholder=""
                rules={{ required: "Không bỏ trống!" }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
