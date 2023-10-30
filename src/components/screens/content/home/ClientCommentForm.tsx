import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { customerTalk } from "~/api";
import {
  Button,
  FormCard,
  FormInput,
  FormSwitch,
  FormTextarea,
  FormUpload,
  Modal,
} from "~/components";
import { useDeepEffect } from "~/hooks";
import { TForm } from "~/types/table";

export const ClientCommentForm: React.FC<
  TForm<TCustomerBenefit> & { refetchcustomerComment }
> = ({ onCancel, visible, defaultValues, refetchcustomerComment }) => {
  const { control, reset, handleSubmit, getValues } = useForm<TCustomerBenefit>(
    {
      mode: "onBlur",
    }
  );

  useDeepEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const _onPress = (data: TEmployee & { UserGroupId: number }) => {
    const id = toast.loading("Đang xử lý ...");
    customerTalk
      .update(data)
      .then(() => {
        refetchcustomerComment();
        toast.update(id, {
          render: "Cập nhật thành công!",
          type: "success",
          isLoading: false,
          autoClose: 500,
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
            <p>Cập nhật khách hàng nhận xét</p>
          </div>
        </FormCard.Header>

        <FormCard.Body>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Name"
                rules={{ required: "This field is required" }}
                label="Tên khách hàng"
                placeholder=""
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
                label="Nội dung nhận xét"
                placeholder=""
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormSwitch
                control={control}
                name="Active"
                label="Trạng thái:"
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
