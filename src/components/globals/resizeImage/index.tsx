import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { baseFile } from "~/api";

const handleCopyLink = (id) => {
  const target = document.querySelector(`#${id}`);
  const copyText = target?.getAttribute("data-url").replaceAll(" ", "%20");
  navigator.clipboard.writeText(copyText);
};

const handleUpdload = async (file) => {
  const id = toast.loading("Đang up ảnh ...");
  baseFile
    .uploadFile(file.originFileObj)
    .then((res) => {
      toast.update(id, {
        render: "Up thành công! Copy link bên dưới!",
        isLoading: false,
        type: "success",
        autoClose: 1000,
      });
      const target = document.querySelector(`#${file.uid}`);
      target.setAttribute(
        "class",
        "bg-main pointer-events-all opacity-1 px-2 rounded-[6px] text-white cursor-pointer hover:bg-sec"
      );
      target.setAttribute("data-url", res?.Data);
    })
    .catch((error) => {
      toast.update(id, {
        render: "Up Thất bại! vui lòng thử lại!",
        isLoading: false,
        type: "error",
        autoClose: 1000,
      });
    });
};

export const ResizeImage: React.FC = () => {
  const props = {
    multiple: false,
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      if (!isPNG) {
        toast.error("Vui lòng chỉ up hình ảnh .png hoặc .jpg");
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: false,
    },
    itemRender: (originNode, file) => {
      return (
        <div className="flex justify-between items-center bg-[#e3e3e3] rounded-[6px] py-1 px-2 my-1">
          <span className="">{file?.name}</span>
          <span className="flex gap-1">
            <div
              className="bg-[green] px-2 text-white rounded-[6px] cursor-pointer hover:bg-blue h-fit"
              onClick={(e) => {
                (e.target as HTMLElement).style.pointerEvents = "none";
                (e.target as HTMLElement).style.opacity = "0.5";
                handleUpdload(file);
              }}
            >
              Upload
            </div>
            <div
              id={file.uid}
              className="bg-main pointer-events-none opacity-[0.5] px-2 rounded-[6px] text-white cursor-pointer hover:bg-sec h-fit"
              onClick={() => handleCopyLink(file.uid)}
            >
              copy
            </div>
          </span>
        </div>
      );
    },
  };

  return (
    <Upload {...props}>
      <Button className="!bg-blue" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};
