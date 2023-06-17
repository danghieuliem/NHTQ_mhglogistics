import { Affix, Skeleton, Tag } from "antd";
import router from "next/router";
import React from "react";
import { IconButton } from "~/components/globals/button/IconButton";
import { paymentStatus } from "~/configs/appConfigs";
import { TControl } from "~/types/field";
import { _format } from "~/utils";

type TProps = TControl<TRequestPaymentOrder> & {
  onPress: (data: TRequestPaymentOrder) => void;
  loading: boolean;
  data: any;
};

export const RequestPaymentDetailLeftForm: React.FC<TProps> = ({
  handleSubmit,
  getValues,
  onPress,
  loading,
  data,
}) => {
  return (
    <Affix offsetTop={20}>
      <div>
        <div className="tableBox">
          <div className="flex border-b border-[#0000001a]">
            <div className="w-2/4 p-2 text-sm font-bold text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                ID
              </Skeleton>
            </div>
            <div className="w-2/4 p-2 text-sm font-medium text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                {/* {getValues("Id")} */} {data?.Data?.Id}
              </Skeleton>
            </div>
          </div>
          <div className="flex border-b border-[#0000001a]">
            <div className="w-2/4 p-2 text-sm font-bold text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                Trạng thái
              </Skeleton>
            </div>
            <div className="w-2/4 p-2 text-sm font-medium text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                {/* <Tag color={paymentData[getValues("Status")]?.color}>{paymentData[getValues("Status")]?.name}</Tag> */}
                <Tag
                  color={
                    paymentStatus.find((x) => x.id === data?.Data?.Status)
                      ?.color
                  }
                >
                  {data?.Data?.StatusName}
                </Tag>
              </Skeleton>
            </div>
          </div>
          <div className="flex border-b border-[#0000001a]">
            <div className="w-2/4 p-2 text-sm font-bold text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                Tổng tiền
              </Skeleton>
            </div>
            <div className="w-2/4 p-2 text-sm font-medium text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                {/* {_format.getVND(getValues("TotalPriceVND"))} */}
                {_format.getVND(data?.Data?.TotalPriceVND)}
              </Skeleton>
            </div>
          </div>
          <div className="flex border-b border-[#0000001a]">
            <div className="w-2/4 p-2 text-sm font-bold text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                Đã trả
              </Skeleton>
            </div>
            <div className="w-2/4 p-2 text-sm font-medium text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                {/* {_format.getVND(getValues("Deposit"))} */}
                {_format.getVND(data?.Data?.Deposit)}
              </Skeleton>
            </div>
          </div>
          <div className="flex border-b border-[#0000001a] mb-6">
            <div className="w-2/4 p-2 text-sm font-bold text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                Còn lại
              </Skeleton>
            </div>
            <div className="w-2/4 p-2 text-sm font-medium text-[#6d6d6d]">
              <Skeleton
                loading={loading}
                paragraph={{ rows: 1, width: 100 }}
                title={false}
              >
                {/* {_format.getVND(getValues("TotalPriceVND") - getValues("Deposit"))} */}
                {_format.getVND(
                  data?.Data?.TotalPriceVND - data?.Data?.Deposit
                )}
              </Skeleton>
            </div>
          </div>

          <div className="flex mt-2 mb-1 justify-center">
            <Skeleton
              loading={loading}
              paragraph={{
                rows: 1,
                width: 100,
                className: "flex justify-end mr-4",
              }}
              title={false}
            >
              <IconButton
                icon="fas fa-edit"
                title="Cập nhật"
                onClick={handleSubmit(onPress)}
                showLoading
                btnClass="!mr-4"
                toolip=""
              />
            </Skeleton>
            <Skeleton
              loading={loading}
              paragraph={{
                rows: 1,
                width: 100,
                className: "flex justify-start",
              }}
              title={false}
            >
              <IconButton
                icon="fas fa-undo"
                title="Trở về"
                toolip=""
                yellow
                onClick={() => router.back()}
              />
            </Skeleton>
          </div>
        </div>
      </div>
    </Affix>
  );
};
