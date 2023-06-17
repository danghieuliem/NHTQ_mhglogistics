import { Card } from "antd";
import React from "react";
import { _format } from "~/utils";

type TProps = {
  Title?: string;
  IMG?: string;
  Created?: Date;
  Summary?: string;
};

const CartItem: React.FC<TProps> = ({ Title, IMG, Created, Summary }) => {
  return (
    <React.Fragment>
      <Card
        style={{ overflow: "hidden" }}
        cover={
          <img
            alt={Title}
            src={IMG ?? "/default/pro-empty.jpg"}
            style={{ width: "100%", height: "150px" }}
          />
        }
      >
        <p
          className="font-bold !mb-3 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: "44px",
          }}
        >
          {Title}
        </p>
        <p
          className="text-[#6b6f82] overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            height: "88px",
          }}
        >
          {Summary ?? "..."}
        </p>
        <p className="text-xs pt-4 text-[#c0bfbf]">
          {_format.getVNDate(Created)}
        </p>
      </Card>
    </React.Fragment>
  );
};

export default CartItem;
