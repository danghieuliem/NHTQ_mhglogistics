import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { feeGoodsChecking } from "~/api/fee-check-product";
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  Modal,
  toast,
} from "~/components";
import { TForm } from "~/types/table";
import { _format } from "~/utils";

const TariffGoodsCheckingForm: FC<TForm<TTariffGoodsChecking>> = ({
  onCancel,
  defaultValues,
  visible,
}) => {
  const { handleSubmit, reset, control } = useForm<TTariffGoodsChecking>({
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  // get item by id
  const { isFetching } = useQuery(
    ["feeGoodsCheckingId", defaultValues?.Id],
    () => feeGoodsChecking.getByID(defaultValues?.Id).then((res) => res.Data),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data),
      onError: toast.error,
      refetchOnReconnect: false,
    }
  );

  // Update item
  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(feeGoodsChecking.update, {
    // refresh item + table data after updating successfully
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries("fee-goods-checking");
      queryClient.setQueryData(
        ["feeGoodsCheckingId", defaultValues?.Id],
        variables
      );
      onCancel();
    },
  });
  const _onPress = (data: TTariffGoodsChecking) => {
    mutationUpdate.mutate({ ...data });
  };

  function handleOnCancel() {
    reset();
    onCancel();
  }

  return (
    <Modal visible={visible}>
      <FormCard loading={isFetching || mutationUpdate.isLoading}>
        <FormCard.Header onCancel={handleOnCancel}>
          <div className="w-full">
            <p>CẤU HÌNH PHÍ KIỂM ĐẾM {defaultValues?.Id}</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid xs:grid-cols-2 gap-3">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="TypeName"
                label="Tên loại phí"
                placeholder="Cấp người dùng"
                disabled={true}
                rules={{ required: "Không bỏ trống tên loại phí" }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="Fee"
                label="Mức phí - VNĐ"
                placeholder="Mức phí - VNĐ"
                rules={{
                  required: "Không bỏ trống",
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    "Không đúng định dạng số",
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="AmountFrom"
                label="Số lượng từ"
                placeholder="Số lượng từ"
                rules={{
                  required: "Không bỏ trống",
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    "Không đúng định dạng số",
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="AmountTo"
                label="Số lượng đến"
                placeholder="Số lượng đến"
                rules={{
                  required: "Không bỏ trống",
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    "Không đúng định dạng số",
                }}
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
          <Button title="Hủy" btnClass="!bg-red" onClick={handleOnCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};

export const TariffGoodsCheckingFormMemo = React.memo(TariffGoodsCheckingForm);
