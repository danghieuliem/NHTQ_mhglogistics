import { Modal, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { mainOrder } from "~/api";
import {
  FormSelect,
  FormTextarea,
  IconButton,
  showToast,
  toast,
} from "~/components";
import {
  EFormalPaymentData,
  EPaymentTypeData,
  formalPaymentData,
  paymentTypeData,
} from "~/configs/appConfigs";
import { _format } from "~/utils";

type TProps = {
  data: TOrder;
  loading: boolean;
  refetch: () => void;
};

export const OrderPaymentForm: React.FC<TProps> = ({
  data,
  loading,
  refetch,
}) => {
  const { query } = useRouter();
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset, getValues, setValue } =
    useForm<TPaymentOrder>({
      mode: "onBlur",
    });

  useEffect(() => {
    if (!!data) {
      reset({
        Id: data.Id,
        PaymentMethod: EFormalPaymentData.Live,
        PaymentType: EPaymentTypeData.Payment,
      });
    }
  }, [data]);

  const mutationUpdate = useMutation(mainOrder.payment, {
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      refetch();
    },
    onError: (error) => {
      showToast({
        title: "Đã xảy ra lỗi!",
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    },
  });

  const router = useRouter();
  const _onPress = async (data_pay: TPaymentOrder) => {
    const amountValue =
      getValues("PaymentType") === 1
        ? data?.AmountDeposit
        : data?.RemainingAmount;

    // console.log("payment data: ", { ...data_pay, Amount: amountValue });

    await mutationUpdate.mutateAsync({ ...data_pay, Amount: amountValue });
  };

  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-2">
          <p className="text-[16px] font-semibold text-[#585858]">
            Thông tin phí
          </p>
        </div>
        <div className="infoPayment bg-[#f8f8f8] p-4">
          <div className="mb-4">
            <div className="flex justify-between pb-2">
              <div className="tracking-wide">
                <Skeleton
                  paragraph={{ rows: 1, width: 180 }}
                  title={false}
                  loading={loading}
                  active
                >
                  Mã đơn hàng
                </Skeleton>
              </div>
              <div className=" text-sm font-semibold text-[#585858]">
                <Skeleton
                  paragraph={{ rows: 1, width: 80 }}
                  title={false}
                  loading={loading}
                  active
                >
                  {"# "}
                  {data?.Id}
                </Skeleton>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="tracking-wide text-sm">
                <Skeleton
                  paragraph={{ rows: 1, width: 180 }}
                  title={false}
                  loading={loading}
                  active
                >
                  Tổng hóa đơn
                </Skeleton>
              </div>
              <div className=" text-sm font-semibold text-[#585858]">
                <Skeleton
                  paragraph={{ rows: 1, width: 80 }}
                  title={false}
                  loading={loading}
                  active
                >
                  {_format.getVND(data?.TotalOrderAmount)}
                </Skeleton>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="border-t-2 border-t-[#0c5963] py-4">
            <div className="flex justify-between py-2 ">
              <div className="tracking-wide text-sm">
                <Skeleton
                  paragraph={{ rows: 1, width: 180 }}
                  title={false}
                  loading={loading}
                  active
                >
                  Số tiền phải đặt cọc
                </Skeleton>
              </div>
              <div className=" text-sm font-semibold text-[#585858]">
                <Skeleton
                  paragraph={{ rows: 1, width: 80 }}
                  title={false}
                  loading={loading}
                  active
                >
                  {_format.getVND(data?.AmountDeposit)}
                </Skeleton>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="tracking-wide text-sm flex items-center">
                <Skeleton
                  paragraph={{ rows: 1, width: 180 }}
                  title={false}
                  loading={loading}
                  active
                >
                  Số tiền phải thanh toán
                </Skeleton>
              </div>
              <div className="text-sm font-semibold text-[#585858] ">
                <Skeleton
                  paragraph={{ rows: 1, width: 80 }}
                  title={false}
                  loading={loading}
                  active
                >
                  {_format.getVND(data?.TotalOrderAmount)}
                </Skeleton>
              </div>
            </div>
          </div>
          {/*  */}
          <div className=" border-t-2 border-t-[#0c5963] py-4">
            <div className="flex justify-between py-2 items-center">
              <div className="tracking-wide text-sm">
                <Skeleton
                  paragraph={{ rows: 1, width: 180 }}
                  title={false}
                  loading={loading}
                  active
                >
                  Số tiền đã đặt cọc
                </Skeleton>
              </div>
              <div className=" text-sm font-semibold text-[#585858]">
                <Skeleton
                  paragraph={{ rows: 1, width: 80 }}
                  title={false}
                  loading={loading}
                  active
                >
                  {_format.getVND(data?.Deposit)}
                </Skeleton>
              </div>
            </div>
            <div className="flex justify-between py-2 items-center">
              <div className="tracking-wide text-sm">
                <Skeleton
                  paragraph={{ rows: 1, width: 180 }}
                  title={false}
                  loading={loading}
                  active
                >
                  Số tiền đã thanh toán
                </Skeleton>
              </div>
              <div className="text-sm font-semibold text-[#585858] ">
                <Skeleton
                  paragraph={{ rows: 1, width: 80 }}
                  title={false}
                  loading={loading}
                  active
                >
                  {_format.getVND(data?.Deposit)}
                </Skeleton>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-2 border-t-2 border-t-[#0c5963] pt-4">
            <div className="tracking-wide text-sm">
              <Skeleton
                paragraph={{ rows: 1, width: 180 }}
                title={false}
                loading={loading}
                active
              >
                Số tiền cần thanh toán
              </Skeleton>
            </div>
            <div className="text-sm font-semibold text-[#585858] ">
              <Skeleton
                paragraph={{ rows: 1, width: 80 }}
                title={false}
                loading={loading}
                active
              >
                {_format.getVND(data?.RemainingAmount)}
              </Skeleton>
            </div>
          </div>
        </div>
        <div className="payment px-2 ">
          <div className="flex mt-4 justify-between">
            <div className="tracking-wide text-sm">
              <i className="fas fa-user mr-2"></i>
              <Skeleton
                paragraph={{ rows: 1, width: 180 }}
                title={false}
                loading={loading}
                active
              >
                Người đặt hàng
              </Skeleton>
            </div>
            <div className="text-sm font-semibold text-[#585858]">
              <Skeleton
                paragraph={{ rows: 1, width: 80 }}
                title={false}
                loading={loading}
                active
              >
                {data?.FullName}
              </Skeleton>
            </div>
          </div>
          <div className="flex mt-4 justify-between">
            <div className="tracking-wide text-sm">
              <i className="fas fa-wallet mr-2"></i>
              <Skeleton
                paragraph={{ rows: 1, width: 180 }}
                title={false}
                loading={loading}
                active
              >
                Ví tiền của khách đặt hàng
              </Skeleton>
            </div>
            <div className=" text-sm font-semibold text-[#585858]">
              <Skeleton
                paragraph={{ rows: 1, width: 80 }}
                title={false}
                loading={loading}
                active
              >
                {_format.getVND(data?.Wallet)}
              </Skeleton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 items-center justify-between">
            <div className="tracking-wide col-span-1 text-sm">
              <i className="fas fa-credit-card-front mr-2"></i>
              <Skeleton
                paragraph={{ rows: 1, width: 180 }}
                title={false}
                loading={loading}
                active
              >
                <span>Loại thanh toán</span>
              </Skeleton>
            </div>
            <div className="col-span-1">
              <Skeleton
                paragraph={{ rows: 1, width: "100%" }}
                title={false}
                loading={loading}
                active
              >
                {data?.Deposit > 0 ? (
                  <FormSelect
                    placeholder=""
                    control={control}
                    name="PaymentType"
                    data={paymentTypeData}
                    defaultValue={paymentTypeData[1]}
                    rules={{ required: "This field is required" }}
                    disabled
                  />
                ) : (
                  <FormSelect
                    placeholder=""
                    control={control}
                    name="PaymentType"
                    data={paymentTypeData}
                    defaultValue={paymentTypeData[1]}
                    rules={{ required: "This field is required" }}
                  />
                )}
              </Skeleton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 items-center justify-between">
            <div className="tracking-wide col-span-1 text-sm">
              <i className="fab fa-cc-visa mr-2"></i>
              <Skeleton
                paragraph={{ rows: 1, width: 180 }}
                title={false}
                loading={loading}
                active
              >
                <span>Phương thức thanh toán</span>
              </Skeleton>
            </div>
            <div className="col-span-1">
              <Skeleton
                paragraph={{ rows: 1, width: "100%" }}
                title={false}
                loading={loading}
                active
              >
                <FormSelect
                  placeholder="Chọn phương thức?"
                  control={control}
                  name="PaymentMethod"
                  data={formalPaymentData}
                  rules={{ required: "This field is required" }}
                />
              </Skeleton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 items-center justify-between">
            <div className="tracking-wide col-span-1 text-sm">
              <Skeleton
                paragraph={{ rows: 1, width: 180 }}
                title={false}
                loading={loading}
                active
              >
                Nội dung thanh toán
              </Skeleton>
            </div>
            <div className="col-span-1">
              <Skeleton
                paragraph={{ rows: 1, width: "100%" }}
                title={false}
                loading={loading}
                active
              >
                <FormTextarea placeholder="" control={control} name="Note" />
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <Skeleton
          paragraph={{ rows: 1, width: 180 }}
          title={false}
          loading={loading}
          active
        >
          {data?.RemainingAmount !== 0 && (
            <IconButton
              onClick={() => {
                Modal.confirm({
                  title: <b>Vui lòng kiểm tra lại!</b>,
                  content: (
                    <div className="mt-6">
                      <div className="flex justify-between mb-3">
                        <span>Loại thanh toán: </span>
                        <span className="font-bold">
                          {getValues("PaymentType") === 1
                            ? "Đặt cọc"
                            : "Thanh toán"}
                        </span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span>Phương thức thanh toán: </span>
                        <span className="font-bold">
                          {getValues("PaymentMethod") === 1
                            ? "Trực tiếp"
                            : "Ví điện tử"}
                        </span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span>Số tiền cần thanh toán: </span>
                        <span className="font-bold">
                          {getValues("PaymentType") === 1
                            ? _format.getVND(data?.AmountDeposit, " VNĐ")
                            : _format.getVND(data?.RemainingAmount, " VNĐ")}
                        </span>
                      </div>
                      <b className="mt-10 block">
                        Xác nhận thanh toán kiện hàng này?
                      </b>
                    </div>
                  ),
                  onOk: handleSubmit(_onPress),
                });
              }}
              icon="fas fa-check-circle"
              title="Thanh toán"
              btnClass="!mr-4"
              showLoading
              toolip=""
            />
          )}
          <Link href={`/manager/order/order-list/detail/?id=${query?.id}`}>
            <a>
              <IconButton
                onClick={undefined}
                icon="far fa-info-square"
                title="Chi tiết đơn hàng"
                showLoading
                toolip=""
                btnClass="!mr-4"
              />
            </a>
          </Link>

          <IconButton
            onClick={() => router.back()}
            icon="fas fa-reply-all"
            title="Trở về"
            showLoading
            toolip=""
          />
        </Skeleton>
      </div>
    </React.Fragment>
  );
};
