import { Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useRef, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";

import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import { baseFile } from "~/api";

// const getBase64 = (file: RcFile): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

type TProps<TFieldValues> = React.PropsWithChildren<{}> & {
  required?: boolean;
  name: Path<TFieldValues>;
  label?: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  maxCount?: number;
  listType?: "picture" | "picture-card" | "text";
  image?: boolean;
  className?: string;
  fileType?: string | string[];
  messsageFileType?: string;
  messsageFileMB?: string;
  mb?: number;
  disabled?: boolean;
};

export const FormUploadMultiple = <
  TFieldValues extends FieldValues = FieldValues
>({
  label,
  name,
  control,
  required = true,
  rules,
  maxCount = 1,
  listType = "picture-card",
  children,
  image = false,
  className,
  fileType = ["image/jpeg", "image/png"],
  messsageFileMB,
  messsageFileType,
  mb = 2,
  disabled = false,
}: TProps<TFieldValues>) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {
    field: { value, onChange, onBlur, ...newField },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  // console.log(errors);

  // const handleCancel = () => setPreviewOpen(false);

  // const handlePreview = async (file: UploadFile) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj as RcFile);
  //   }

  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewOpen(true);
  //   setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  // };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    if (newFileList.length && newFileList.length === fileList.length) {
      baseFile
        .uploadFile(newFileList[newFileList.length - 1]?.originFileObj)
        .then((res) => {
          if (typeof value === "undefined") {
            onChange([res?.Data]);
          } else {
            onChange([...value, res?.Data]);
          }
        });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <React.Fragment>
      {label && (
        <label
          className="text-[12px] py-[2px] uppercase font-bold"
          htmlFor={name}
        >
          {label} {required === true && <span className="text-red">*</span>}
        </label>
      )}
      <div>
        <Upload
          listType="picture-card"
          fileList={fileList}
          // multiple={true}

          onChange={async (file) => {
            if (file.fileList.length > 6) {
              setErrorMsg("Bạn upload quá 6 ảnh");
              return;
            }

            if (
              file.file.type === "image/jpeg" ||
              file.file.type === "image/png" ||
              file.file.type === "image/jpg"
            ) {
              setErrorMsg("");
              handleChange(file);
            } else {
              setErrorMsg("Vui lòng chỉ upload file .png hoặc .jpg");
              return;
            }
          }}
        >
          {fileList.length >= 6 ? null : uploadButton}
        </Upload>
        <p className="text-red text-lg italic">{errorMsg}</p>
      </div>
    </React.Fragment>
  );
};
