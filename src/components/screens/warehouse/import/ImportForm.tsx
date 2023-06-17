import { Modal } from "antd";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { bigPackage, smallPackage } from "~/api";
import { FormSelect, FormUpload, showToast } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";

export const ImportForm = () => {
  const { control, handleSubmit } = useForm<TImport>({ mode: "onBlur" });
  const [bigPackages, setBigPackages] = useState([]);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const { isFetching, refetch } = useQuery(
    "bigPackageList",
    () =>
      bigPackage.getList({
        PageIndex: 1,
        PageSize: 1000000,
        OrderBy: "Id desc",
        Status: 1,
      }),
    {
      onSuccess: (data) => {
        setBigPackages(data?.Data?.Items);
      },
      onError: toast.error,
    }
  );
  const handleExportExcelTemplate = async () => {
    try {
      setLoadingExport(true);
      const res = await smallPackage.getTemplateImport();
      setLoadingExport(false);
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  const _onPress = (data: TImport) => {
    setLoadingImport(true);
    smallPackage
      .postImportPackage(data)
      .then((res) => {
        Modal.info({
          title: "Import thành công!",
          content: (
            <div>
              <p>Số mã hành công: {res?.Data?.TotalSuccess}</p>
              <p>Số mã thất bại: {res?.Data?.TotalFailed} </p>
              <p>Số mã trùng: {res?.Data?.TotalDuplicate}</p>
              <p>Số kiện được cập nhật: {res?.Data?.TotalUpdate}</p>
            </div>
          ),
          onOk() {},
        });
        setLoadingImport(false);
      })
      .catch((error) => {
        setLoadingImport(false);
        showToast({
          title: "Không thể import!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <FormSelect
        control={control}
        name="BigPackageId"
        data={bigPackages}
        select={{ label: "Name", value: "Id" }}
        defaultValue={{ Name: "Chọn bao lớn", Id: 0 }}
        placeholder="Chọn bao lớn"
        selectClassName="max-w-[500px]"
      />
      <div className="mt-4 max-w-[500px]">
        <FormUpload
          control={control}
          name="FileURL"
          label="Import file: "
          listType="text"
          rules={{ required: "This field is required" }}
          fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          messsageFileType="Đây không phải là file excel"
        >
          <div className="rounded-lg px-2 text-xl text-main">
            <i className="fas fa-upload"></i>
          </div>
        </FormUpload>
      </div>
      <div className="flex mt-4">
        <IconButton
          onClick={handleSubmit(_onPress)}
          btnClass={"mr-4"}
          icon={loadingImport ? "fas fa-sync fa-spin" : "fas fa-file-import"}
          btnIconClass="!mr-2"
          title="Import"
          toolip=""
          disabled={loadingImport}
        />
        <IconButton
          onClick={handleExportExcelTemplate}
          btnIconClass="!mr-2"
          icon={loadingExport ? "fas fa-sync fa-spin" : "fas fa-file-export"}
          title="Xuất File Mẫu"
          toolip=""
          disabled={loadingExport}
        />
      </div>
    </React.Fragment>
  );
};
