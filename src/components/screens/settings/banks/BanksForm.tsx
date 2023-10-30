import { Image } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { bank } from "~/api/bank";
import {
  Button,
  FormCard,
  FormInput,
  FormSelect,
  FormSwitch,
  Modal,
} from "~/components";
import { toast } from "~/components/toast";
import { useCatalogue } from "~/hooks";
import { TForm } from "~/types/table";
import { _format } from "~/utils";

export const BanksForm: React.FC<TForm<TBank> & { type?: string }> = ({
  onCancel,
  defaultValues,
  visible,
  btnAddTitle,
  title,
  type,
}) => {
  const { handleSubmit, reset, control, watch } = useForm<TBank>({
    mode: "onBlur",
  });
  const [bankSelectId, setBankSelectId] = useState({});

  const { vietQRbankList } = useCatalogue({
    bankVietQREnabled: type === "add",
  });

  React.useEffect(() => {
    if (visible) {
      reset(!defaultValues ? { Active: true } : defaultValues);
    }
  }, [visible]);

  React.useEffect(() => {
    if (!bankSelectId && type !== "add") return;

    const bankTarget = vietQRbankList?.find((x) => x.id === bankSelectId);

    reset({
      BankName: bankTarget?.shortName,
      IMG: bankTarget?.logo,
      Active: true,
      // IMGQR: bankTarget?.logo,
    });
  }, [bankSelectId]);

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
      delete dataOnPress?.BankId;
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
          <div className="grid sm:grid-cols-2 gap-2">
            {type === "add" && (
              <div className="col-span-full">
                <FormSelect
                  control={control}
                  name="BankId"
                  placeholder="Vui lòng chọn ngân hàng"
                  data={vietQRbankList}
                  label="Chọn ngân hàng"
                  select={{
                    label: "longName",
                    value: "id",
                  }}
                  callback={(val) => {
                    setBankSelectId(val);
                  }}
                />
              </div>
            )}
            <FormInput
              control={control}
              name="BankName"
              label="Tên ngân hàng"
              required={false}
              disabled={true}
              placeholder="Tên ngân hàng"
            />
            <FormInput
              control={control}
              name="Name"
              label="Chi nhánh"
              rules={{ required: "Vui lòng điền Chi nhánh" }}
              placeholder="Chi nhánh"
            />
            <FormInput
              control={control}
              name="Branch"
              label="Chủ tài khoản "
              rules={{ required: "Vui lòng điền Chủ tài khoản" }}
              placeholder="Chủ tài khoản "
            />
            <FormInput
              control={control}
              name="BankNumber"
              label="Số tài khoản"
              rules={{ required: "Vui lòng điền Số tài khoản" }}
              placeholder="Số tài khoản"
            />

            {/* <FormUpload
                  control={control}
                  name="IMG"
                  label="Hình ảnh ngân hàng"
                  rules={{ required: "không bỏ trống hình ảnh" }}
                /> */}
            <FormSwitch
              control={control}
              name="Active"
              label="Trạng thái"
              required={false}
            />
            <Image src={watch().IMG} width={"200px"} />
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title={btnAddTitle}
            btnClass="!bg-main mr-2"
            onClick={handleSubmit(_onPress)}
          />
          <Button title="Hủy" btnClass="!bg-red" onClick={handleOnCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
