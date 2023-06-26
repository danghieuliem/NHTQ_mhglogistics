import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { step } from "~/api";
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

export const RegisterStepsForm: React.FC<
  TForm<TRegisterSteps> & { refetchRegisterSteps }
> = ({ onCancel, visible, defaultValues, refetchRegisterSteps }) => {
  useDeepEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const { control, getValues, handleSubmit, reset } = useForm<TRegisterSteps>({
    mode: "onBlur",
  });

  const _onPress = (data: TEmployee & { UserGroupId: number }) => {
    const id = toast.loading("Đang xử lý ...");
    step
      .update(data)
      .then(() => {
        refetchRegisterSteps();
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
            <p>Chỉnh sửa bước</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Name"
                label="Tên bước"
                placeholder=""
                rules={{ required: "This field is required!" }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="Position"
                label="Sắp xếp"
                placeholder=""
                rules={{ required: "This field is required1" }}
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
              <FormTextarea
                control={control}
                name="Description"
                label="Mô tả ngắn"
                placeholder=""
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormSwitch control={control} name="Active" label="Trạng thái:" />
            </div>
            <div className="col-span-2">
              <FormUpload
                control={control}
                name="IMG"
                label="Cập nhật ảnh"
                required={false}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title="Cập nhật"
            btnClass="!bg-main mr-2"
            onClick={handleSubmit(_onPress)}
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
