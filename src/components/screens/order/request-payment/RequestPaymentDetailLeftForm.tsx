import { Skeleton } from "antd";
import React from "react";
import { IconButton } from "~/components/globals/button/IconButton";
import { FormSelect } from "~/components/globals/formBase";
import { payHelpStatus } from "~/configs";
import { TControl } from "~/types/field";
import { _format } from "~/utils";

type TProps = TControl<TRequestPaymentOrder> & {
  onPress: (data: TRequestPaymentOrder) => void;
  loading: boolean;
  data: any;
  control;
};

export const RequestPaymentDetailLeftForm: React.FC<TProps> = ({
  handleSubmit,
  getValues,
  onPress,
  loading,
  data,
  control,
}) => {
  return (
    <div>
      <div className="tableBox">
        <div className="grid grid-cols-2 border-b border-[#0000001a]">
          <div className="p-2 text-sm font-bold text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              ID
            </Skeleton>
          </div>
          <div className="p-2 text-sm font-medium text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              {/* {getValues("Id")} */} {data?.Data?.Id}
            </Skeleton>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b border-[#0000001a]">
          <div className="p-2 text-sm font-bold text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              Username
            </Skeleton>
          </div>
          <div className="p-2 text-sm font-medium text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              {/* {getValues("Id")} */} {data?.Data?.UserName}
            </Skeleton>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b border-[#0000001a]">
          <div className="p-2 text-sm font-bold text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              Tổng tiền
            </Skeleton>
          </div>
          <div className="p-2 text-sm font-medium text-[#6d6d6d]">
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
        <div className="grid grid-cols-2 border-b border-[#0000001a]">
          <div className="p-2 text-sm font-bold text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              Đã trả
            </Skeleton>
          </div>
          <div className="p-2 text-sm font-medium text-[#6d6d6d]">
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
        <div className="grid grid-cols-2 border-b border-[#0000001a]">
          <div className="p-2 text-sm font-bold text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              Còn lại
            </Skeleton>
          </div>
          <div className="p-2 text-sm font-medium text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              {/* {_format.getVND(getValues("TotalPriceVND") - getValues("Deposit"))} */}
              {_format.getVND(data?.Data?.TotalPriceVND - data?.Data?.Deposit)}
            </Skeleton>
          </div>
        </div>
        <div className="grid grid-cols-full border-b border-[#0000001a]">
          <div className="w-full p-2 text-sm font-medium text-[#6d6d6d]">
            <Skeleton
              loading={loading}
              paragraph={{ rows: 1, width: 100 }}
              title={false}
            >
              <FormSelect
                menuPlacement="bottom"
                control={control}
                name="Status"
                label="Trạng thái"
                defaultValue={{
                  id: payHelpStatus?.find((x) => x?.id === getValues("Status"))
                    ?.id,
                  name: payHelpStatus?.find(
                    (x) => x?.id === getValues("Status")
                  )?.name,
                }}
                placeholder=""
                data={payHelpStatus}
                rules={{ required: "This field is required" }}
              />
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
        </div>
      </div>
    </div>
  );
};
