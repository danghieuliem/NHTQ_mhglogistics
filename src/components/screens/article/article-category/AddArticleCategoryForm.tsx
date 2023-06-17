import React from "react";
import { FormInput, FormEditor } from "~/components";
import { FormSwitch } from "~/components/globals/formBase";
import { TControl } from "~/types/field";

export const AddArticleCategoryForm: React.FC<
  TControl<TArticleCategory & { sideBar: boolean }>
> = ({ control }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "24px",
          marginTop: 20,
          padding: "0 20px",
        }}
      >
        <div
          style={{
            gridColumn: "1/4",
          }}
        >
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
        <div
          style={{
            gridColumn: "4/13",
						minHeight: 700
          }}
        >
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
