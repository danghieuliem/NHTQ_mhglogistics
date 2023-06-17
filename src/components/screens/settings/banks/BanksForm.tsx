import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { bank } from "~/api/bank";
import {
  Button,
  FormCard,
  FormInput,
  FormSwitch,
  FormUpload,
  Modal,
} from "~/components";
import { toast } from "~/components/toast";
import { TForm } from "~/types/table";
import { _format } from "~/utils";

export const BanksForm: React.FC<TForm<TBank>> = ({
  onCancel,
  defaultValues,
  visible,
  btnAddTitle,
  title,
}) => {
  const { handleSubmit, reset, control } = useForm<TBank>();

  React.useEffect(() => {
    if (visible) {
      reset(!defaultValues ? {} : defaultValues);
    }
  }, [visible]);

  // fetch get item by id
  const { isFetching, data } = useQuery(
    ["bankId", defaultValues?.Id],
    () => bank.getByID(defaultValues?.Id).then((res) => res.Data),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data),
      onError: toast.error,
    }
  );

  // update item
  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(bank.update, {
    // refresh item + table data after updating successfully
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries("bankList");
      queryClient.setQueryData(["bankId", defaultValues?.Id], {
        ...variables,
        IMG: _format.addUrlForImage(variables?.IMG),
      });
      toast.success("Cập nhật thành công");
      onCancel();
    },
    onError: toast.error,
  });

  // add item
  const mutationAdd = useMutation(bank.create, {
    // refresh item + table data after adding successfully
    onSuccess: async () => {
      queryClient.invalidateQueries("bankList");
      reset();
      onCancel();
      toast.success("Thêm thành công");
    },
    onError: toast.error,
  });

  const _onPress = async (dataOnPress: TBank) => {
    if (defaultValues?.Id) {
      // update method
      return mutationUpdate.mutateAsync({ ...dataOnPress });
    } else {
      // add method
      return mutationAdd.mutateAsync({ ...dataOnPress });
    }
  };

  function handleOnCancel() {
    reset();
    onCancel();
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard
        loading={
          isFetching || mutationUpdate?.isLoading || mutationAdd?.isLoading
        }
      >
        <FormCard.Header onCancel={handleOnCancel}>
          <div className="w-full">
            <p>{title || `CẤU HÌNH NGÂN HÀNG #${data?.Id}`}</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="BankName"
                label="Tên ngân hàng"
                placeholder="Tên ngân hàng"
                rules={{ required: "Không bỏ trống tên ngân hàng" }}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Name"
                label="Chi nhánh"
                placeholder="Chi nhánh"
                rules={{ required: "không bỏ trống tên chi nhánh" }}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Branch"
                label="Chủ tài khoản "
                placeholder="Chủ tài khoản "
                rules={{ required: "không bỏ trống chủ tài khoản" }}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="BankNumber"
                label="Số tài khoản"
                placeholder="Số tài khoản"
                rules={{ required: "không bỏ trống số dư tài khoản" }}
              />
            </div>
            <div className="col-span-2 grid grid-cols-2">
              <div className="col-span-1">
                <FormUpload
                  control={control}
                  name="IMG"
                  label="Hình ảnh ngân hàng"
                  rules={{ required: "không bỏ trống hình ảnh" }}
                />
              </div>
              <div className="col-span-1">
                <FormUpload
                  control={control}
                  name="IMGQR"
                  label="Hình ảnh mã QR"
                  rules={{ required: "không bỏ trống hình ảnh" }}
                />
              </div>
            </div>
            <div className="col-span-2">
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
          <Button
            showLoading
            title={btnAddTitle}
            btnClass="!bg-main"
            onClick={handleSubmit(_onPress)}
          />
          <Button title="Hủy" btnClass="!bg-red" onClick={handleOnCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
