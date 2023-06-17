import { Steps } from "antd";
import React, { memo } from "react";

const { Step } = Steps;

const progessDot = (icon: string) => {
  return <i className={icon}></i>;
};

type TProps = {
  current?: number;
};

export const TrackingSteps: React.FC<TProps> = memo(({ current = 1 }) => {
  const getWidthView = document.body.clientWidth;
  //vertical - horizontal
  return (
    <div className={`mx-auto ${getWidthView <= 888 ? '' : 'py-8 px-8'}`}>
      <div className="">
        <Steps
          
          direction={getWidthView <= 888 ? 'vertical' : 'horizontal'}
          className="tracking"
          current={current}
          labelPlacement="vertical"
          status="wait"
        >
          <Step
            title="Đang lấy hàng"
            progressDot={() => progessDot("fas fa-shopping-cart")}
          />
          <Step
            title="Đã về kho TQ"
            progressDot={() => progessDot("fas fa-warehouse-alt")}
          />
          {/* <Step title="Đang vận chuyển" progressDot={() => progessDot("fa fa-shipping-fast")} /> */}
          <Step
            title="Đã về kho VN"
            progressDot={() => progessDot("fas fa-warehouse-alt")}
          />
          {/* <Step title="Đã thanh toán" progressDot={() => progessDot("fas fa-sack-dollar")} /> */}
          <Step
            title="Đã giao hàng"
            progressDot={() => progessDot("fa fa-box-check")}
          />
        </Steps>
      </div>
    </div>
  );
});
