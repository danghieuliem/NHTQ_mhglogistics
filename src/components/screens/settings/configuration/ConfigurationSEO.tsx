import React, { FC } from "react";
import { Control } from "react-hook-form";
import { FormInput, FormTextarea, FormUpload } from "~/components";

type TProps<T extends object = object> = {
  control: Control<T, object>;
  data: T;
};

export const ConfigurationSEO: FC<TProps<TConfig6>> = ({ control, data }) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-3 gap-4 px-6">
        <FormInput
          control={control}
          name="MetaTitle"
          label="Title"
          placeholder=""
          required={false}
        />
        <FormInput
          control={control}
          name="OGTitle"
          label="OG Title"
          placeholder="Nhập OG Title"
          required={false}
        />
        <FormInput
          control={control}
          name="OGTwitterTitle"
          label="OG Twitter Title"
          placeholder="Nhập OG Twitter Title"
          required={false}
        />
        <FormInput
          control={control}
          name="OGLocale"
          label="Local"
          placeholder=""
          required={false}
        />
        <FormInput
          control={control}
          name="OGDescription"
          label="OG Description"
          placeholder="Nhập OG Description"
          required={false}
        />
        <FormInput
          control={control}
          name="OGTwitterDescription"
          label="OG Twitter Description"
          placeholder="Nhập OG Twitter Description"
          required={false}
        />
        <FormInput
          control={control}
          name="MetaKeyword"
          label="Meta Keyword"
          placeholder=""
          required={false}
        />
        <FormInput
          control={control}
          name="GoogleAnalytics"
          label="Google Analytics (Đặt nội dung trong thẻ script)"
          placeholder=""
          required={false}
        />
        <FormInput
          control={control}
          name="GoogleSiteVerification"
          label="Mã xác nhận từ google search console"
          placeholder=""
          required={false}
        />
        <div className="col-span-1">
          <FormUpload
            control={control}
            name="OGImage"
            label="OG Image"
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormUpload
            control={control}
            name="OGTwitterImage"
            label="OG Twitter Image"
            required={false}
          />
        </div>

        <FormTextarea
          control={control}
          name="MetaDescription"
          label="Meta Description"
          placeholder="Nhập meta description"
          required={false}
        />

        {/* <FormTextarea
          control={control}
          name="WebmasterTools"
          label="WebMaster Tools (Đặt nội dung trong thẻ script)"
          placeholder=""
          required={false}
        />

        <FormTextarea
          control={control}
          name="HeaderScriptCode"
          label="Header Script Code (Đặt nội dung trong thẻ script)"
          placeholder=""
          required={false}
        />

        <FormTextarea
          control={control}
          name="FooterScriptCode"
          label="Footer Script (Đặt nội dung trong thẻ script)"
          placeholder=""
          required={false}
        /> */}
      </div>
    </React.Fragment>
  );
};
