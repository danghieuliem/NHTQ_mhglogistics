import { ErrorMessage } from "@hookform/error-message";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { baseFile } from "~/api";

const init = {
  height: "100%",
  menubar: true,
  language: "vi",
  language_url: "/langs/vi.js",
  plugins:
    "advlist image code autolink lists charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste directionality code help wordcount",
  toolbar:
    "undo redo | link image  | fontSize | bold italic underline | alignleft aligncenter " +
    "alignright alignjustforecolorify | bullist numlist outdent indent | ltr rtl " +
    "removeformat | help",
  // content_style:
  //   "body { font-family:Times New Roman,Times,sans-serif; font-size:12pt }",
  file_picker_types: "image",
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      let file = (this as any).files[0];
      await baseFile
        .uploadFile(file)
        .then((res) => {
          cb(res?.Data, { title: file.original_filename });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    input.click();
  },
};

type TProps<TFieldValues> = {
  required?: boolean;
  name: Path<TFieldValues>;
  label: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
};

export const FormEditor = <TFieldValues extends FieldValues = FieldValues>({
  control,
  label,
  name,
  required = true,
  rules,
}: TProps<TFieldValues>) => {
  return (
    <React.Fragment>
      <label
        className="text-[12px] py-[2px] uppercase font-bold"
        htmlFor={name}
      >
        {label} {required === true && <span className="text-red">*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, ...newField },
          formState: { errors },
        }) => (
          <div className="!h-full">
            <Editor
              id={name}
              apiKey={"iac8cfkdevssbiceknww2kkrpmblwb0ywmzork74l3kg1tlc"}
              init={{
                ...init,
              }}
              onEditorChange={onChange}
              {...newField}
            />
            <ErrorMessage
              errors={errors}
              name={name as any}
              render={({ message }) => (
                <p className="text-warning text-xs font-medium mt-1">
                  {message}
                </p>
              )}
            />
          </div>
        )}
      />
    </React.Fragment>
  );
};
