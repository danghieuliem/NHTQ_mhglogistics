import { Card } from "antd";
import React from "react";
import { smallPackageStatus } from "~/configs";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import { TrackingSteps } from "./TrackingSteps";

type TProps = {
  data: TWarehouseCN[];
};

export const TrackingDetail: React.FC<TProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <Card
        className="col-span-6 xl:col-span-2 !h-fit"
        title="Thông tin"
        extra={
          <TagStatus
            color={
              smallPackageStatus?.find((x) => x.id === data?.[0]?.Status)?.color
            }
            statusName={
              smallPackageStatus?.find((x) => x.id === data?.[0]?.Status)?.name
            }
          />
        }
      >
        <div className="flex items-center justify-between py-2">
          <span className="text-black">Mã vận đơn: </span>
          <span className="text-main">{data?.[0]?.OrderTransactionCode}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-black">Loại đơn hàng: </span>
          <span className="text-main">{data?.[0]?.OrderTypeName}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-black">Tổng tiền hàng: </span>
          <span className="text-main">
            {_format.getVND(data?.[0].TotalPrice, "")}
          </span>
        </div>
      </Card>
      <Card className="col-span-6 xl:col-span-4" title="Timeline">
        <TrackingSteps data={data?.[0]} />
      </Card>
    </div>
  );
};
