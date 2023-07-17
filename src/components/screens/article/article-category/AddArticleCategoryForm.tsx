import React from "react";
import { FormEditor, FormInput } from "~/components";
import { FormSwitch } from "~/components/globals/formBase";
import { TControl } from "~/types/field";

export const AddArticleCategoryForm: React.FC<
  TControl<TArticleCategory & { sideBar: boolean }>
> = ({ control }) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-4 p-2">
        <div className="col-span-3">
          <div className="mb-4">
            <FormInput
              control={control}
              label="Tên chuyên mục"
              placeholder="Nhập tên chuyên mục"
              name="Name"
              rules={{
                required: "không bỏ trống tên chuyên mục",
              }}
            />
          </div>
          <div className="mb-4">
            <FormSwitch control={control} name="sideBar" label="Hiện sidebar" />
          </div>
        </div>
        <div className="col-span-9 min-h-[700px]">
          <FormEditor
            control={control}
            label=""
            name="Description"
            required={false}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
