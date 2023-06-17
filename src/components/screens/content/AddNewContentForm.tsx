import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { menu } from "~/api";
import {
  FormCard,
  FormInput,
  FormInputNumber,
  FormSwitch,
  IconButton,
  Modal,
  showToast,
  toast,
} from "~/components";

export const AddNewContentForm: React.FC<any> = ({ visible, onCancel }) => {
  const { control, handleSubmit, getValues, reset } = useForm<any>();
  const queryClient = useQueryClient();

  const mutationAdd = useMutation((data: any) => menu.create(data), {
    onSuccess: () => {
      reset({
        Name: "",
        Link: "",
        Active: false,
        Position: null,
      });
      queryClient.invalidateQueries("menuData");
      toast.success("Tạo bài viết thành công");
      onCancel();
    },
    onError: (error) => {
      showToast({
        title:
          (error as any)?.response?.data?.ResultCode === 500
            ? "Lỗi server!"
            : "Lỗi tạo menu!",
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    },
  });

  const _onCreate = async (newData: any) => {
    mutationAdd.mutateAsync({
      ...newData,
      Position: newData?.index,
      Name: newData?.Name.trim(),
      Link: newData?.Link.trim(),
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        reset({
          Name: "",
          Link: "",
          Active: false,
          Position: null,
        });
        onCancel();
      }}
      width={1000}
    >
      <FormCard>
        <FormCard.Header
          onCancel={() => {
            reset({
              Name: "",
              Link: "",
              Active: false,
              Position: null,
            });
            onCancel();
          }}
        >
          <div className="w-full">
            <p>Thêm Menu</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Name"
                label="Tên menu"
                placeholder=""
                rules={{ required: "Vui lòng điền tên menu" }}
              />
            </div>
            <div className="col-span-2">
              <FormInputNumber
                control={control}
                name="index"
                label="Vị trí"
                placeholder=""
                rules={{ required: "Vui lòng điền vị trí hiển thị" }}
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
            showLoading
            btnClass="!ml-auto"
            toolip=""
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
