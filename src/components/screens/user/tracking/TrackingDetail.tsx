import React from "react";
import { ESmallPackageStatusData } from "~/configs/appConfigs";
import { _format } from "~/utils";
import { TrackingSteps } from "./TrackingSteps";

type TProps = {
  data: TWarehouseCN[];
};

export const TrackingDetail: React.FC<TProps> = ({ data }) => {
  const getWidthView = document.body.clientWidth;

  const handleEmployee = () => {
    let employee = "Chưa có";
    let firstItem = data[0];
    if (firstItem.Status === ESmallPackageStatusData.New) {
      employee = firstItem.CreatedBy;
    } else if (
      firstItem.Status === ESmallPackageStatusData.ArrivedToChinaWarehouse
    ) {
      employee = firstItem.StaffTQWarehouse;
    } else if (
      firstItem.Status === ESmallPackageStatusData.ArrivedToVietNamWarehouse
    ) {
      employee = firstItem.StaffVNWarehouse;
    }
    else if (firstItem.Status === ESmallPackageStatusData.Shipped) {
      employee = firstItem.StaffVNOutWarehouse;
    }

    return employee;
  };

  const handleTimer = () => {
    let time = null;
    let firstItem = data[0];
    if (firstItem.Status === ESmallPackageStatusData.New) {
      time = _format.getVNDate(firstItem.Created);
    } else if (
      firstItem.Status === ESmallPackageStatusData.ArrivedToChinaWarehouse
    ) {
      time = _format.getVNDate(firstItem.DateInTQWarehouse);
    } else if (
      firstItem.Status === ESmallPackageStatusData.ArrivedToVietNamWarehouse
    ) {
      time = _format.getVNDate(firstItem.DateInLasteWareHouse);
    } else if (firstItem.Status === ESmallPackageStatusData.Shipped) {
      time = _format.getVNDate(firstItem.DateOutWarehouse);
    }

    return time;
  };

  const handleSteps = () => {
    let step = 0;
    let firstItem = data[0];
    if (firstItem.Status === ESmallPackageStatusData.New) {
      step = 1;
    }
    // else if (firstItem.Status === ESmallPackageStatusData.Paid) {
    //   step = 4;
    // }
    else if (
      firstItem.Status === ESmallPackageStatusData.ArrivedToChinaWarehouse
    ) {
      step = 2;
    } else if (
      firstItem.Status === ESmallPackageStatusData.ArrivedToVietNamWarehouse
    ) {
      step = 3;
    } else if (firstItem.Status === ESmallPackageStatusData.Shipped) {
      step = 5;
    }

    return step;
  };

  return (
    <React.Fragment>
      <div className="xl:p-6">
        <div className="rounded-t-sm py-6 border-b border-b-[#e0e0e0]">
          <p className={`${getWidthView <= 560 ? 'uppercase flex flex-col' : 'uppercase'}`}>
            <span className="uppercase text-base mr-6">Mã vận đơn:</span>
            <span className="uppercase text-xl font-bold text-[#4E7D48]">
              {data[0]?.OrderTransactionCode}
            </span>
          </p>
        </div>
        <div className={`flex flex-wrap items-center justify-start ${getWidthView <= 888 ? 'justify-between  border-b-[1px]' : 'justify-start'}`}>
          <p className={`text-sm mr-4 ${getWidthView <= 888 ? 'py-[8px]' :'py-4'}`}>
            {data[0]?.OrderTypeName}:{" "}
            <span className="font-bold tracking-tighter">{data[0].TransportationOrderId || data[0].MainOrderId}</span>
          </p>
          <p className={`text-sm mr-4 ${getWidthView <= 888 ? 'py-[8px]' :'py-4'}`}>
            Thời gian:{" "}
            <span className="font-bold tracking-tighter">{handleTimer()}</span>
          </p>
          <p className={`text-sm mr-4 ${getWidthView <= 888 ? 'py-[8px]' :'py-4'}`}>
            Trạng thái:{" "}
            <span className="font-bold tracking-tighter">
              {data[0]?.StatusName}
            </span>
          </p>
          <p className={`text-sm mr-4 ${getWidthView <= 888 ? 'py-[8px]' :'py-4'}`}>
            Nhân viên xử lý:{" "}
            <span className="font-bold tracking-tighter">
              {handleEmployee()}
            </span>
          </p>
        </div>
      </div>
      <TrackingSteps current={handleSteps()} />
    </React.Fragment>
  );
};
