import React, { FC } from "react";
import { Control } from "react-hook-form";
import { FormEditor, FormInput } from "~/components";

type TProps<T extends object = object> = {
  control: Control<T, object>;
  data: T;
};

export const ConfigurationNotification: FC<TProps<TConfig4>> = ({
  control,
  data,
}) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 grid-cols-1 gap-4 grid h-fit">
          <div className="col-span-1">
            <FormInput
              control={control}
              name="NotiPopupTitle"
              label="Tiêu đề thông báo Popup (Bỏ trống tiêu đề sẽ không hiện thông báo trang home)"
              placeholder=""
              required={false}
              // rules={{
              // 	required: 'Không bỏ trống nội dung tiêu đề thông báo Popup'
              // }}
            />
          </div>
          <div className="col-span-1">
            <FormInput
              control={control}
              name="NotiPopupEmail"
              label="Email liên hệ Popup"
              placeholder=""
              required={false}
              // rules={{ required: 'Không bỏ trống nội dung Email liên hệ Popup' }}
            />
          </div>
        </div>
        <div className="md:col-span-3 min-h-[600px]">
          <FormEditor
            control={control}
            name="NotiPopup"
            label="Nội dung thông báo Popup"
            required={false}

            // rules={{ required: 'Không bỏ trống nội dung thông báo Popup' }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
