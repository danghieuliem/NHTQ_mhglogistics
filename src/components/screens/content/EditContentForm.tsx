import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { menu } from "~/api";
import {
  FormCard,
  FormInput,
  FormInputNumber,
  FormSwitch,
  Modal,
  showToast,
  toast,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";

const loadingStyle = `!absolute !inset-0 !flex !items-center !justify-center z-10`;

export const EditContentForm: React.FC<any> = ({ edit, onCancel }) => {
  const [data, setData] = useState<any>();
  const { control, handleSubmit, setValue, reset } = useForm<any>({
    mode: "onBlur",
  });
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reset({
      Name: "",
      Link: "",
      Active: false,
      Position: null,
    });

    const getMenu = async () => {
      setLoading(true);
      menu.getByID(edit).then((res) => {
        setLoading(false);
        setData(res?.Data);
        setValue("Name", res?.Data?.Name);
        setValue("Link", res?.Data?.Link);
        setValue("Active", res?.Data?.Active);
        setValue("Position", res?.Data?.Position);
      });
    };
    if (edit !== 0) getMenu();
  }, [edit]);

  const mutationUpdate = useMutation(
    (data: TEmployee & { UserGroupId: number }) => menu.update(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("menuData");
        onCancel();
        setLoading(false);
        mutationUpdate.reset(), toast.success("Cập nhật menu thành công");
      },
      onError: (error) => {
        showToast({
          title:
            (error as any)?.response?.data?.ResultCode === 500
              ? "Lỗi server!"
              : "Lỗi! Kiểm tra lại!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
    }
  );

  const _onPress = (
    newData: TEmployee & { UserGroupId: number; Link: string }
  ) => {
    setLoading(true);
    mutationUpdate.mutate({
      ...data,
      ...newData,
      Name: newData?.Name.trim(),
      Link: newData?.Link.trim(),
    });
  };

  return (
    <Modal visible={edit !== 0 ? true : false} width={1000}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Cập nhật menu</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          {loading && <Spin className={loadingStyle} />}
          <div className={`grid grid-cols-2 gap-4 ${loading && "opacity-50"}`}>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Name"
                label="Tên menu"
                placeholder={""}
                rules={{ required: "Vui lòng điền thông tin" }}
              />
            </div>
            <div className="col-span-2">
              <FormInputNumber
                control={control}
                name="Position"
                label="Vị trí"
                placeholder=""
                rules={{ required: "Vui lòng điền vị trí hiển thị" }}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Link"
                label="Link menu"
                placeholder={""}
                rules={{ required: "Vui lòng điền thông tin" }}
              />
            </div>
            <div className="col-span-1">
              <FormSwitch
                control={control}
                name="Active"
                label="Trạng thái"
                required={false}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <IconButton
            onClick={handleSubmit(_onPress)}
            icon="fas fa-edit"
            btnIconClass="!mr-2"
            title="Cập nhật"
            showLoading
            toolip=""
            disabled={loading}
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
