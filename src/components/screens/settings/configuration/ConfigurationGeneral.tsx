import { Popconfirm, Switch, Tooltip } from "antd";
import React, { FC, useState } from "react";
import { Control } from "react-hook-form";
import { FormEditor, FormInput, FormRangeDate, FormUpload } from "~/components";

type TProps<T extends object = object> = {
  control: Control<T, object>;
  data: T;
};

export const ConfigurationGeneral: FC<TProps<TConfig1>> = ({
  control,
  data,
}) => {
  const [editChormeEx, setEditChormeEx] = useState(false);
  const [editCocCocEx, setEditCocCocEx] = useState(false);
  const [changeTimeWork, setChangeTimeWork] = useState(false);

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-4 px-6 mt-4">
        <p className="text-xs" style={{ color: "red" }}>
          * Lưu ý trước khi thay đổi!
        </p>
        <div className="col-span-1 mb-3">
          <FormInput
            control={control}
            label="Tên website"
            placeholder="Nhập hàng Order Trung Minh Quang"
            name="WebsiteName"
            required={false}
          />
        </div>
        <div className="col-span-1 mb-3 flex">
          <div className="mr-8">
            <FormUpload
              control={control}
              name="LogoIMG"
              label="Logo"
              required={false}
            />
          </div>
          <div className="mr-8">
            <FormUpload
              control={control}
              name="BannerIMG"
              label="Banner trang chủ"
              required={false}
            />
          </div>
          {/* <div className="mr-8">
						<FormUpload
							control={control}
							name="BackgroundAuth"
							label="Hình nền trang đăng nhập"
							required={false}
						/>
					</div> */}
        </div>
        <div className="col-span-1 mb-3 flex items-end">
          <FormInput
            onBlur={() => setEditChormeEx(!editChormeEx)}
            control={control}
            label="Đường đến công cụ (Chrome)"
            placeholder=""
            name="ChromeExtensionLink"
            // disabled={!editChormeEx}
            // rules={{ required: 'Không bỏ trống tên đường dẫn!' }}
          />
          <Popconfirm
            placement="topLeft"
            title="Bạn có muốn thay đổi đường dẫn?"
            onConfirm={() => setEditChormeEx(!editChormeEx)}
            okText="Yes"
            cancelText="No"
          >
            {/* <ActionButton icon="fas fa-edit" title="" /> */}
          </Popconfirm>
        </div>
        <div className="col-span-1 mb-3 flex items-end">
          <FormInput
            onBlur={() => setEditCocCocEx(!editCocCocEx)}
            control={control}
            label="Đường dẫn đến công cụ (Cốc cốc)"
            placeholder=""
            name="CocCocExtensionLink"
            // disabled={!editCocCocEx}
            // rules={{ required: 'Không bỏ trống tên đường dẫn!' }}
          />
          <Popconfirm
            placement="topLeft"
            title="Bạn có muốn thay đổi đường dẫn?"
            onConfirm={() => setEditCocCocEx(!editCocCocEx)}
            okText="Yes"
            cancelText="No"
          >
            {/* <ActionButton icon="fas fa-edit" title="" /> */}
          </Popconfirm>
        </div>
        <div className="col-span-1 mb-3 flex grid grid-cols-4 gap-4">
          <div className="">
            <FormInput
              control={control}
              label="Tên công ty viết tắt"
              placeholder=""
              name="CompanyName"
              required={false}
              // rules={{ required: 'Không bỏ trống tên công ty viết tắt' }}
            />
          </div>
          <div className="">
            <FormInput
              control={control}
              label="Tên công ty ngắn"
              placeholder=""
              name="CompanyShortName"
              required={false}
              // rules={{ required: 'Không bỏ trống tên công ty ngắn' }}
            />
          </div>
          <div className="">
            <FormInput
              control={control}
              label="Tên công ty dài"
              placeholder=""
              name="CompanyLongName"
              required={false}
              // rules={{ required: 'Không bỏ trống tên công ty dài' }}
            />
          </div>
          <div className="">
            <FormInput
              control={control}
              label="Mã số thuế"
              placeholder=""
              name="TaxCode"
              required={false}
            />
          </div>
        </div>
        <div className="col-span-1 mb-3 grid grid-cols-3 gap-4">
          <div className="flex">
            <div className="flex flex-col items-baseline mr-4">
              <div>
                Giờ hoạt động:{" "}
                <span className="font-bold ml-2">{data?.TimeWork}</span>
              </div>
              <Tooltip title="Thay đổi thời gian làm việc!">
                <Switch
                  className="!mr-4"
                  onChange={() => setChangeTimeWork(!changeTimeWork)}
                />
              </Tooltip>
            </div>
            <div>
              {changeTimeWork && (
                <FormRangeDate
                  control={control}
                  label="Chọn giờ làm việc mới!"
                  placeholder={["Bắt đầu", "Kết thúc"]}
                  name="TimeWork"
                  required={false}
                  // rules={{ required: 'Chọn giờ hoạt động' }}
                />
              )}
            </div>
          </div>
          <FormInput
            control={control}
            label="Email liên lạc"
            placeholder=""
            name="EmailContact"
            required={false}
            // rules={{ required: 'Không bỏ trống Email liên lạc' }}
          />
          <FormInput
            control={control}
            label="Email hỗ trợ"
            placeholder=""
            name="EmailSupport"
            required={false}
            // rules={{ required: 'không bỏ trống Email hỗ trợ' }}
          />
        </div>
        <div className="col-span-1 mb-3 grid grid-cols-3 gap-4">
          <FormInput
            control={control}
            label="Hotline"
            placeholder=""
            name="Hotline"
            required={false}
            // rules={{ required: 'Không bỏ trống hotline' }}
          />
          <FormInput
            control={control}
            label="Hotline hỗ trợ"
            placeholder=""
            name="HotlineSupport"
            required={false}
            // rules={{ required: 'Không bỏ trống hotline hỗ trợ' }}
          />
          <FormInput
            control={control}
            label="Hotline phản hồi"
            placeholder=""
            name="HotlineFeedback"
            required={false}
            // rules={{ required: 'Không bỏ trống hotline phản hồi' }}
          />
        </div>
        <div className="col-span-1 mb-3">
          <FormInput
            control={control}
            label="Địa chỉ 1"
            name="Address"
            placeholder="Địa chỉ 1"
            inputContainerClassName="mb-3"
          />
          <FormInput
            control={control}
            label="Địa chỉ 2"
            name="Address2"
            placeholder="Địa chỉ 2"
            required={false}
            inputContainerClassName="mb-3"
          />
          <FormInput
            control={control}
            label="Địa chỉ 3"
            name="Address3"
            placeholder="Địa chỉ 3"
            required={false}
          />
          {/* <FormEditor
            control={control}
            label="Địa chỉ"
            name="Address"
            required={false}
          /> */}
        </div>
      </div>
    </React.Fragment>
  );
};
