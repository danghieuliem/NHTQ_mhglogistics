import { InboxOutlined } from "@ant-design/icons";
import { message, Tooltip, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { baseFile } from "~/api";
import styles from "./index.module.css";
const { Dragger } = Upload;

const RenderLink = ({ listImage }) => {
  const [copiedList, setCopiedList] = useState([]);

  const handleCopyLink = (targetELm) => {
    const copyText = targetELm?.IMG;
    navigator.clipboard.writeText(copyText);

    if (copiedList.length <= 0) {
      setCopiedList([...copiedList, targetELm]);
      return;
    }

    const index = copiedList.indexOf(targetELm);
    if (index === -1) {
      setCopiedList([...copiedList, targetELm]);
    }
  };

  return (
    <div className="flex-1">
      {listImage?.map((img) => (
        <div key={img.Id} className={styles.renderImageList}>
          <img src={img.IMG} alt="" />
          <div className={styles.input}>
            <input type="text" value={img?.IMG} disabled />
            {copiedList?.find((item) => item.Id === img.Id) && (
              <i className="fas fa-check-circle !text-[14px] !text-[#008000] flex items-center mr-2"></i>
            )}
            <Tooltip
              title={
                !copiedList?.find((item) => item.Id === img.Id)
                  ? "Copy link"
                  : "Đã copy"
              }
            >
              <i
                className={`fas fa-copy cursor-pointer text-[20px] ${
                  !copiedList?.find((item) => item.Id === img.Id)
                    ? "!text-[#008000]"
                    : "text-[#3333336e]"
                }`}
                onClick={() => handleCopyLink(img)}
              ></i>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ResizeImage: React.FC = () => {
  const [listImage, setlistImage] = useState([]);

  const props: UploadProps = {
    showUploadList: false,
    name: "file",
    multiple: false,
    // fileList: [],
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        baseFile.uploadFile(info.file.originFileObj).then((res) => {
          setlistImage([...listImage, { IMG: res?.Data, Id: info.file.uid }]);
        });
      }
      if (status === "done") {
        // message.success(`${info.file.name} up ảnh thành công!`);
      } else if (status === "error") {
        // message.error(`${info.file.name} up ảnh thất bại!`);
      }
    },
    onDrop(e) {
      // console.log(e);
      // console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove(e) {
      // console.log(e);
    },
  };

  return (
    <>
      <div className="mb-6 text-red">
        Lưu ý: để đảm bảo size hình nhỏ nhất và đảm bảo tốc độ load cao nhất,
        vui lòng update hình vào đây và gắn link vào bài viết
      </div>
      <div className={styles.wrapperResizeImage}>
        <Dragger {...props} className="!w-[300px] !h-[100px]">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click hoặc kéo thả hình</p>
        </Dragger>
        <RenderLink listImage={listImage} />
      </div>
    </>
  );
};
