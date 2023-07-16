import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { complain } from "~/api";
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormTextarea,
  FormUpload,
  Modal,
  toast,
} from "~/components";
import { reportStatusData } from "~/configs/appConfigs";
import { useDeepEffect } from "~/hooks";
import { TForm } from "~/types/table";

export const ComplainListForm: React.FC<TForm<TReport>> = ({
  onCancel,
  visible,
  defaultValues,
}) => {
  const { handleSubmit, reset, control } = useForm<TReport>({
    defaultValues: defaultValues,
  });

  useDeepEffect(() => {
    if (visible) {
      reset({
        ...defaultValues,
        AmountCNY:
          defaultValues?.Amount &&
          defaultValues?.CurrentCNYVN &&
          defaultValues?.Amount / defaultValues?.CurrentCNYVN,
      });
    }
  }, [visible]);

  // fetch get item by id
  const { isFetching, data } = useQuery(
    ["reportId", defaultValues?.Id],
    () => complain.getByID(defaultValues?.Id).then((res) => res.Data),
    {
      enabled: !!defaultValues?.Id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data),
      onError: toast.error,
    }
  );

  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(
    (data: TReport) => complain.updateComplain(data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries("reportList");
        // mutationUpdate.reset();
        // refetch();
        toast.success("Cập nhật phiếu khiếu nại thành công");
      },
      onError: toast.error,
    }
  );

  const _onPress = async (dataOnPress: TReport) => {
    try {
      // let IMG: string = await _format.formatAfterUploadImage(
      // 	data?.IMG,
      // 	dataOnPress?.IMG?.[0]
      // );
      toast.info("Đang xử lý, đợi tý ...");
      mutationUpdate.mutateAsync(dataOnPress);
      onCancel();
    } catch (error) {
      toast.error((error as any)?.response?.data?.ResultMessage);
    }
  };

  return (
    <Modal visible={visible} width={700} onCancel={onCancel}>
      <FormCard loading={isFetching}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Chi tiết khiếu nại #{data?.Id} </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="UserName"
                label="Username"
                placeholder=""
                disabled
                required={false}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="MainOrderId"
                label="Mã đơn hàng"
                placeholder=""
                disabled
                required={false}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="AmountCNY"
                placeholder=""
                label="Số tiền (¥)"
                prefix="¥ "
                disabled
                required={false}
              />
            </div>
            <div className="col-span-1">
              <FormInputNumber
                control={control}
                name="CurrentCNYVN"
                placeholder=""
                label="Tỉ giá"
                disabled
                required={false}
              />
            </div>

            <div className="col-span-2">
              <FormInputNumber
                control={control}
                name="Amount"
                label="Số tiền (VNĐ)"
                placeholder=""
                suffix=" VNĐ"
                rules={{ required: "This field is required" }}
                disabled={defaultValues?.Status === 3}
              />
            </div>

            <div className="col-span-2">
              <FormSelect
                control={control}
                name="Status"
                placeholder=""
                label="Trạng thái"
                rules={{ required: "This field is required" }}
                data={reportStatusData.slice(1)}
                defaultValue={{
                  id: defaultValues?.Status,
                  name: defaultValues?.StatusName,
                }}
                disabled={defaultValues?.Status === 3}
              />
            </div>
            <div className="col-span-1">
              <FormUpload
                control={control}
                name="IMG"
                required={false}
                disabled
                label="Ảnh"
              />
            </div>
            <div className="col-span-3">
              <FormTextarea
                control={control}
                name="ComplainText"
                label="Nội dung"
                placeholder=""
                disabled
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
          <Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
