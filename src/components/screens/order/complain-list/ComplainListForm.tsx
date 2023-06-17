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
  showToast,
  toast,
} from "~/components";
import { reportStatusData } from "~/configs/appConfigs";
import { useDeepEffect } from "~/hooks";
import { TForm } from "~/types/table";
import { _format } from "~/utils";

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
      showToast({
        title: (error as any)?.response?.data?.ResultCode,
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
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
          <div className="lg:grid lg:grid-cols-4 gap-3">
            <div className="col-span-1 mb-2 lg:mb-0">
              <FormInput
                control={control}
                name="UserName"
                label="Username"
                placeholder=""
                disabled
                required={false}
              />
            </div>
            <div className="col-span-1 mb-2 lg:mb-0">
              <FormInput
                control={control}
                name="MainOrderId"
                label="Mã đơn hàng"
                placeholder=""
                disabled
                required={false}
              />
            </div>
            <div className="col-span-1 mb-2 lg:mb-0">
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
            <div className="col-span-1 mb-2 lg:mb-0">
              <FormInputNumber
                control={control}
                name="CurrentCNYVN"
                placeholder=""
                label="Tỉ giá"
                disabled
                required={false}
              />
            </div>
            <div className="col-span-4 mb-2 lg:mb-0">
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
            <div className="col-span-4 mb-2 lg:mb-0">
              <FormTextarea
                control={control}
                name="ComplainText"
                label="Nội dung"
                placeholder=""
                disabled
                required={false}
              />
            </div>
            <div className="col-span-4 mb-2 lg:mb-0">
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
            <div className="col-span-4 mb-2 lg:mb-0">
              <FormUpload
                control={control}
                name="IMG"
                required={false}
                disabled
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            showLoading
            title="Cập nhật"
            btnClass="!bg-main"
            onClick={handleSubmit(_onPress)}
            disabled={defaultValues?.Status === 3}
          />
          <Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
