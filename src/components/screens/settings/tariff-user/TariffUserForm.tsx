import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userLevel } from "~/api";
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  Modal,
  toast,
} from "~/components";
import { useAppSelector } from "~/store";
import { TForm } from "~/types/table";
import { _format } from "~/utils";

export const TariffUserForm: FC<TForm<TTariffUser>> = ({
  onCancel,
  defaultValues,
  visible,
}) => {
  const { handleSubmit, reset, control } = useForm<TTariffUser>({
    defaultValues,
    mode: "onBlur",
  });

  const userNew = useAppSelector((state) => state.user.current);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  // get item by id
  const { isFetching } = useQuery(
    ["userLevelId", defaultValues?.Id],
    () => userLevel.getByID(defaultValues?.Id).then((res) => res.Data),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data),
      onError: toast.error,
    }
  );

  // Update item
  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(userLevel.update, {
    // refresh item + table data after updating successfully
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries("userLevelData");
      queryClient.setQueryData(["userLevelId", defaultValues?.Id], variables);
      onCancel();
    },
  });
  const _onPress = (data: TTariffUser) => {
    mutationUpdate.mutate({ ...data });
  };

  function handleOnCancel() {
    reset();
    onCancel();
  }

  return (
    <Modal onCancel={handleOnCancel} visible={visible}>
      <FormCard loading={isFetching || mutationUpdate.isLoading}>
        <FormCard.Header onCancel={handleOnCancel}>
          <div className="w-full">
            <p>CẤU HÌNH PHÍ NGƯỜI DÙNG {defaultValues?.Id}</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Name"
                label="Cấp người dùng"
                placeholder="Cấp người dùng"
                rules={{ required: "Không bỏ trống cấp người dùng" }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="Money"
                label="Tích luỹ tối thiểu"
                placeholder="Tích luỹ tối thiểu"
                rules={{
                  required: "Không bỏ trống chiết khấu phí mua hàng",
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    "Không đúng định dạng số",
                }}
                callback={(val: number) => {
                  if (val > 100) {
                    val = 0;
                  }
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="MoneyTo"
                label="Tích luỹ tối đa"
                placeholder="Tích luỹ tối đa"
                rules={{
                  required: "Không bỏ trống chiết khấu phí mua hàng",
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    "Không đúng định dạng số",
                }}
                callback={(val: number) => {
                  if (val > 100) {
                    val = 0;
                  }
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="FeeBuyPro"
                label="Chiết khấu mua hàng"
                placeholder="Chiết khấu mua hàng"
                rules={{
                  required: "Không bỏ trống chiết khấu phí mua hàng",
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    "Không đúng định dạng số",
                }}
                callback={(val: number) => {
                  if (val > 100) {
                    val = 0;
                  }
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="FeeWeight"
                label="Chiết khấu vận chuyển TQ - VN"
                placeholder="Chiết khấu vận chuyển TQ - VN"
                rules={{
                  required: "Không bỏ trống chiết khấu phí vận chuyển TQ-VN",
                  validate: (val: number) =>
                    _format.isNumber(val.toString()) ||
                    "Không đúng định dạng số",
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="LessDeposit"
                label="Đặt cọc tối thiểu"
                placeholder="Đặt cọc tối thiểu"
                rules={{
                  required: "Không bỏ trống đặt cọc tối thiểu",
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
