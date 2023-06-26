import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { withdraw } from "~/api";
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormTextarea,
  Modal,
} from "~/components";
import { toast } from "~/components/toast";
import { EPaymentStatusData, paymentStatusData } from "~/configs";
import { TForm } from "~/types/table";

export const WithDrawalHistoryForm: React.FC<TForm<TWithDraw>> = ({
  onCancel,
  visible,
  defaultValues,
}) => {
  const { handleSubmit, reset, control } = useForm<TWithDraw>({
    mode: "onBlur",
  });

  const { data, isLoading } = useQuery(
    ["clientWithdrawData", defaultValues?.Id],
    () => withdraw.getByID(defaultValues?.Id),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data?.Data),
      onError: toast.error,
    }
  );

  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(withdraw.update, {
    onSuccess: (data) => {
      toast.success("Cập nhật thông tin rút tiền thành công");
      queryClient.setQueryData(
        ["clientWithdrawData", defaultValues?.Id],
        data.Data
      );
      queryClient.invalidateQueries(["clientWithdrawData"]);
      onCancel();
    },
    onError: toast.error,
  });

  const _onPress = (data: TWithDraw) => {
    const { Updated, UpdatedBy, ...props } = data;
    return mutationUpdate.mutateAsync(props);
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={isLoading}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Thông tin rút tiền #{defaultValues?.Id}</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="UserName"
                label="Username"
                placeholder=""
                disabled
                rules={{
                  required: "This is required field",
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="Amount"
                label="Số tiền rút"
                placeholder=""
                suffix=" VNĐ"
                rules={{
                  required: "This is required field",
                }}
                disabled={defaultValues?.Status === 2}
              />
            </div>
            <div className="col-span-1">
              <FormSelect
                control={control}
                name="Status"
                data={paymentStatusData.slice(1)}
                disabled={
                  defaultValues?.Status !== EPaymentStatusData.Unapproved
                }
                defaultValue={paymentStatusData.find(
                  (x) => x.id === defaultValues?.Status
                )}
                label="Trạng thái"
                placeholder=""
                rules={{
                  required: "This is required field",
                }}
              />
            </div>
            <div className="col-span-3">
              <FormTextarea
                control={control}
                name="Note"
                label="Nội dung"
                placeholder=""
                required={false}
                rows={2}
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
          <Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
