import React from "react";
import { FormInput, FormUpload } from "~/components";
import { TControl } from "~/types/field";

export const ArticleSEOForm: React.FC<
  TControl<TArticleSEO> & { data?: any }
> = ({ control }) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span-1">
          <FormInput
            control={control}
            name="OGUrl"
            label="OG url"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="OGTitle"
            label="OG Title"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="OGDescription"
            label="OG Description"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="OGFacebookTitle"
            label="OG Facebook Title"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="OGFacebookDescription"
            label="OG Facebook Description"
            placeholder=""
            required={false}
          />
        </div>

        <div className="col-span-1">
          <FormInput
            control={control}
            name="OGTwitterTitle"
            label="OG Twitter Title"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="OGTwitterDescription"
            label="OG Twitter Description"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="MetaTitle"
            label="Meta Title"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="MetaDescription"
            label="Meta Description"
            placeholder=""
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="MetaKeyword"
            label="Meta Keywords"
            placeholder="Cách nhau bởi dấu phẩy VD: muahang,trungquoc,vietnam"
            required={false}
          />
        </div>
        <div className="col-span-1 flex justify-between w-[60%]">
          <div>
            <FormUpload
              control={control}
              name="OGTwitterIMG"
              label="OG Twitter Image"
              required={false}
            />
          </div>
          <div>
            <FormUpload
              control={control}
              name="OGFacebookIMG"
              label="OG Facebook Image"
              required={false}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
