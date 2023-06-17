import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { service } from "~/api";
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  FormSwitch,
  FormTextarea,
  FormUpload,
  Modal,
} from "~/components";
import { useDeepEffect } from "~/hooks";
import { TForm } from "~/types/table";

export const ServiceForm: React.FC<TForm<TService> & { refetchService }> = ({
  onCancel,
  visible,
  defaultValues,
  refetchService,
}) => {
  useDeepEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const { control, getValues, handleSubmit, reset } = useForm<TService>({
    mode: "onBlur",
  });

  const _onPress = (data: TEmployee & { UserGroupId: number }) => {
    const id = toast.loading("Đang xử lý ...");
    service
      .update(data)
      .then(() => {
        refetchService();
        toast.update(id, {
          render: "Cập nhật thành công!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: "Cập nhật thất bại!",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      })
      .finally(() => onCancel());
  };

  return (
    <Modal onCancel={onCancel} visible={visible} width={1000}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Chỉnh sửa dịch vụ</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Name"
                label="Tiêu đề"
                placeholder=""
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="Position"
                label="Vị trí"
                placeholder=""
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Link"
                label="Link"
                placeholder=""
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormUpload
                control={control}
                name="IMG"
                label="Hình ảnh"
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormTextarea
                control={control}
                name="Description"
                label="Mô tả ngắn"
                placeholder=""
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormSwitch control={control} name="Active" label="Trạng thái" />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title="Cập nhật"
            btnClass="!bg-main"
            onClick={handleSubmit(_onPress)}
            showLoading
          />
          <Button
            title="Hủy"
            btnClass="!bg-red"
            onClick={() => {
              onCancel();
            }}
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
