import { Tooltip } from "antd";
import clsx from "clsx";
import React from "react";

type TProps = {
  title?: string;
  icon: string;
  toolip?: string;
  onClick?: (data?: any) => void | Promise<any>;
  btnClass?: string;
  btnIconClass?: string;
  showLoading?: boolean;
  disabled?: boolean;
  red?: boolean;
  yellow?: boolean;
  green?: boolean;
  blue?: boolean;
};

const styleBtn =
  "bg-sec mx-0 py-[6px] px-[12px] rounded-[4px] text-white !font-semibold tracking-wide hover:bg-main hover:shadow-none transition-all duration-300";

const styleBtnGreen =
  "text-white !bg-[#1f8f2b] hover:bg-[#d0f5d5] mx-0 py-[6px] px-[12px] rounded-md font-medium tracking-wide hover:shadow";
const styleBtnRed =
  "text-white !bg-[#f02b02] mx-0 py-[6px] px-[12px] rounded-md font-medium tracking-wide hover:shadow";
const styleBtnBlue =
  "text-white !bg-[#0275e0] hover:bg-[#bcdbf7] mx-0 py-[6px] px-[12px] rounded-md !font-semibold tracking-wide hover:shadow";
const styleBtnYellow =
  "text-white !bg-[#f5b811] hover:bg-[#f7e4a3] mx-0 py-[6px] px-[12px] rounded-md !font-semibold tracking-wide hover:shadow";
const styleDisabled = "opacity-25 pointer-events-none";

export const IconButton: React.FC<TProps> = ({
  icon,
  title,
  toolip,
  disabled = false,
  onClick,
  btnClass,
  btnIconClass,
  showLoading,
  red,
  yellow,
  green,
  blue,
}) => {
  const [loading, setLoading] = React.useState(false);

  const _onPress = async () => {
    if (onClick) {
      if (showLoading) {
        try {
          setLoading(true);
          await onClick();
        } catch (error) {
        } finally {
          setLoading(false);
        }
      } else {
        onClick();
      }
    }
  };

  return (
    <Tooltip title={toolip || ""}>
      <button
        onClick={!disabled && !loading ? _onPress : undefined}
        className={clsx(
          styleBtn,
          btnClass,
          green && styleBtnGreen,
          red && styleBtnRed,
          blue && styleBtnBlue,
          yellow && styleBtnYellow,
          disabled && styleDisabled
        )}
      >
        <i
          className={clsx(
            loading ? "fas fa-sync fa-spin" : icon,
            "mr-2 w-3 h-3 ",
            btnIconClass
          )}
        ></i>
        {title}
      </button>
    </Tooltip>
  );
};
