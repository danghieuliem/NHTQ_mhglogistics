import React from "react";
import {
  FormEditor,
  FormInput,
  FormSwitch,
} from "~/components/globals/formBase";
import { TControl } from "~/types/field";

export const EditArticleCategoryForm: React.FC<TControl<TArticleCategory>> = ({
  control,
}) => {
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
                required: "Không bỏ trống tên chuyên mục",
              }}
            />
          </div>
          <div className="mb-4">
            <FormInput
              control={control}
              label="Tiêu đề chuyên mục"
              placeholder="Nhập tiêu đề chuyên mục"
              name="Title"
              rules={{
                required: "Không bỏ trống tiêu đề chuyên mục",
              }}
            />
          </div>
          <div className="mb-4">
            <FormSwitch
              control={control}
              name="Active"
              label={"Hiển thị chuyên mục?"}
            />
          </div>
        </div>
        <div
          style={{
            gridColumn: "4/13",
						minHeight: '800px'
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
