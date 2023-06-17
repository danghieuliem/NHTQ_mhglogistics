import React, { useEffect } from "react";
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
// const loadingStyle = `!absolute !inset-0 !flex !items-center !justify-center z-10`;

export const AddChildContentForm: React.FC<any> = ({ child, onCancel }) => {
  const { control, handleSubmit, setValue, reset } = useForm({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    reset({
      Name: "",
      Position: null,
      Active: false,
    });
  }, [child]);

  const mutationAdd = useMutation((Data: any) => menu.create(Data), {
    onSuccess: () => {
      queryClient.invalidateQueries("menuData");
      toast.success("Tạo menu con thành công");
      onCancel();
    },
    onError: (error) => {
      showToast({
        title:
          (error as any)?.response?.data?.ResultCode === 500
            ? "Lỗi server!"
            : "Lỗi tạo menu con",
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    },
  });

  const _onCreate = async (newData: TAddChildContent) => {
    await mutationAdd.mutateAsync({
      ...newData,
      Name: newData?.Name.trim(),
      Parent: child,
      Link: newData?.Link.trim(),
    });
  };

  return (
    <Modal visible={child !== 0 ? true : false} width={1000}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Thêm Menu Con</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Name"
                label="Tên menu con"
                placeholder=""
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="col-span-2">
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
                label="Link dẫn tới chuyên mục/bài viết"
                placeholder=""
                rules={{ required: "Vui lòng truyền link" }}
              />
            </div>
            <div className="col-span-1">
              <FormSwitch control={control} name="Active" label="Trạng thái" />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <p className="text-red text-[12px] italic">
            Lưu ý: Vui lòng tạo chuyên mục/bài viết trước và gán link vào Menu
          </p>
          <IconButton
            onClick={handleSubmit(_onCreate)}
            icon="far fa-plus"
            title="Tạo"
            btnClass="!ml-auto"
            showLoading
            toolip=""
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
