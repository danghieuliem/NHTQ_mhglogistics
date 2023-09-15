import { Image } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { complain } from "~/api";
import {
  Button,
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormTextarea,
  Modal,
} from "~/components";
import { complainStatus } from "~/configs";
import { useDeepEffect } from "~/hooks";
import { RootState } from "~/store";
import { TForm } from "~/types/table";

const ComplainListForm: React.FC<TForm<TReport>> = ({
  onCancel,
  visible,
  defaultValues,
}) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
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
  const mutationUpdate = useMutation((data: TReport) =>
    complain.updateComplain(data)
  );

  const _onPress = async (dataOnPress: TReport) => {
    onCancel();
    const id = toast.loading("Đang xử lý ...");
    mutationUpdate
      .mutateAsync(dataOnPress)
      .then((res) => {
        queryClient.invalidateQueries("reportList");
        mutationUpdate.reset();
        toast.update(id, {
          render: "Cập nhật thành công!",
          type: "success",
          autoClose: 500,
          isLoading: false,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
      });
  };

  return (
    <Modal visible={visible} width={900} onCancel={onCancel}>
      <FormCard loading={isFetching}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Chi tiết khiếu nại #{data?.Id} </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-3 col-span-1 gap-3">
              <div className="col-span-2">
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
                <FormSelect
                  control={control}
                  name="Status"
                  placeholder=""
                  label="Trạng thái"
                  rules={{ required: "This field is required" }}
                  data={complainStatus}
                  defaultValue={{
                    id: defaultValues?.Status,
                    name: defaultValues?.StatusName,
                  }}
                  disabled={
                    defaultValues?.Status === 0 || defaultValues?.Status === 4
                  }
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
                  name="CurrentCNYVN"
                  placeholder=""
                  label="Tỉ giá"
                  disabled
                  required={false}
                />
              </div>
              <div className="col-span-1">
                <FormInputNumber
                  control={control}
                  name="Amount"
                  label="Số tiền (VNĐ)"
                  placeholder=""
                  disabled={
                    defaultValues?.Status === 0 || defaultValues?.Status === 4
                  }
                  suffix=" VNĐ"
                  rules={{ required: "This field is required" }}
                  // disabled={defaultValues?.Status === 3}
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

            <div className="col-span-1 flex gap-2">
              <Image.PreviewGroup>
                {defaultValues?.IMG &&
                  JSON.parse(defaultValues?.IMG)?.map((item) => (
                    <Image src={item} key={item} width={120} />
                  ))}
              </Image.PreviewGroup>
            </div>

            {/* <div className="col-span-1">
              <FormUpload
                control={control}
                name="IMG"
                required={false}
                disabled
                label="Ảnh"
              />
            </div> */}
          </div>
        </FormCard.Body>
        {userCurrentInfo?.UserGroupId === 1 && (
          <FormCard.Footer>
            <Button
              title="Cập nhật"
              btnClass="!bg-main mr-2"
              onClick={handleSubmit(_onPress)}
              disabled={
                defaultValues?.Status === 0 || defaultValues?.Status === 4
              }
            />
            <Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
          </FormCard.Footer>
        )}
      </FormCard>
    </Modal>
  );
};

export const ComplainListFormMemo = React.memo(ComplainListForm);
