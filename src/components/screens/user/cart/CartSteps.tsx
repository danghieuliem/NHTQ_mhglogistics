import clsx from "clsx";
import React from "react";

const steps = [
  {
    current: 1,
    title: "Giỏ hàng",
    isDivide: true,
    icon: "fas fa-shopping-cart",
  },
  {
    current: 2,
    title: "Chọn địa chỉ nhận hàng",
    isDivide: true,
    icon: "fas fa-map-marked-alt",
  },
  {
    current: 3,
    title: "Đặt cọc và kết đơn",
    isDivide: false,
    icon: "fas fa-box-check",
  },
];

export const CartSteps = ({ current = 1 }: { current?: number }) => {
  return (
    <div className="cartStep">
      {steps?.map((step) => (
        <React.Fragment key={step?.current}>
          <div className={clsx("cartStep-Item", current >= step.current && "active")}>
            <div className="cartStep-Icon">
              <i className={step?.icon}></i>
            </div>
            <div className="cartStep-Title">{step?.title}</div>
          </div>
					{
						step?.isDivide && 
						<div className={clsx("cartStep-process", current === step.current && "active")} />
					}
        </React.Fragment>
      ))}
    </div>
  );
};
