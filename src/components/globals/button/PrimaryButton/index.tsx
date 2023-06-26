import { Button as ButtonAntd } from "antd";
import clsx from "clsx";
import { FC } from "react";
type TProps = {
  title: string;
  loading?: boolean;
  btnClass?: string;
  htmlType?: "button" | "submit" | "reset";
  onClick?: Function | any;
  disabled?: boolean;
};

export const Button: FC<TProps> = ({
  title,
  loading = false,
  disabled = loading,
  btnClass,
  htmlType = "button",
  onClick,
}) => {
  return (
    <ButtonAntd
      loading={loading}
      disabled={disabled}
      className={clsx(btnClass, "!bg-main")}
      htmlType={htmlType}
      onClick={onClick}
    >
      {title}
    </ButtonAntd>
  );
};
