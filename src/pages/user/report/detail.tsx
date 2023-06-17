import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { complain, mainOrder } from "~/api";
import {
  FormInput,
  FormInputNumber,
  FormTextarea,
  FormUpload,
  IconButton,
  showToast,
  UserLayout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter();
  const { current: newUser } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const { data, isError, isLoading } = useQuery(
    ["orderReportList", +query?.id],
    () => mainOrder.getByID(+query?.id),
    {
      onSuccess: (data) => data.Data,
      onError: toast.error,
      retry: false,
    }
  );

  const { handleSubmit, control } = useForm<TReport>({
    mode: "onBlur",
    defaultValues: {
      MainOrderId: Number(query?.id),
      UID: newUser?.UserId,
    },
  });

  const queryClient = useQueryClient();
  const mutationAdd = useMutation((data: TReport) => complain.create(data), {
    onSuccess: () => {
      mutationAdd.reset();
      toast.success("Tạo khiếu nại thành công");
      queryClient.invalidateQueries({ queryKey: "menuData" });
      setLoading(false);
      router.back();
    },
    onError: (error) =>
      showToast({
        title: (error as any)?.response?.data?.ResultCode,
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      }),
  });

  const _onPress = async (data: TReport) => {
    try {
      setLoading(true);
      await mutationAdd.mutateAsync(data);
    } catch (error) {
      toast.error("Lỗi tạo khiếu nại! Vui lòng thử lại!");
    }
  };
  return (
    <React.Fragment>
      <div className="titlePageUser !mb-0">TẠO KHIẾU NẠI MỚI</div>
      <div className="tableBox px-4 ">
        <div className="grid grid-cols-2 gap-4 ">
          <div className="col-span-1">
            <FormInput
              control={control}
              name="MainOrderId"
              disabled
              label="Mã shop"
              placeholder=""
              rules={{ required: "This field is required " }}
            />
          </div>
          <div className="col-span-1">
            <FormInputNumber
              control={control}
              name="Amount"
              label="Số tiền (VNĐ)"
              suffix=" VNĐ"
              placeholder=""
              rules={{ required: "This field is required " }}
            />
          </div>
          <div className="col-span-2">
            <FormTextarea
              control={control}
              name="ComplainText"
              label="Nội dung"
              placeholder=""
              required={false}
            />
          </div>
          <div className="col-span-2">
            <FormUpload
              control={control}
              name="IMG"
              label="Hình ảnh"
              required={false}
            />
          </div>
        </div>
        <div className="text-right">
          <IconButton
            title="Tạo khiếu nại"
            onClick={handleSubmit(_onPress)}
            icon={loading ? "fas fa-sync fa-spin" : "fas fa-check-circle"}
            btnIconClass="!mr-2"
            showLoading
            toolip=""
          />
        </div>
      </div>
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.createComplain;
Index.Layout = UserLayout;

export default Index;
