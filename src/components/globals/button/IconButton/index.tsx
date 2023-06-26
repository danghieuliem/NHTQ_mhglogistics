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
  "bg-main mx-0 py-[4px] px-[8px] rounded-[4px] text-white !font-semibold tracking-wide hover:bg-sec hover:shadow-none transition-all duration-300";

const styleBtnGreen =
  "text-white !bg-green hover:!opacity-[0.6] mx-0 py-[4px] px-[8px] rounded-[4px] font-medium tracking-wide hover:shadow";
const styleBtnRed =
  "text-white !bg-red hover:!opacity-[0.6] mx-0 py-[4px] px-[8px] rounded-[4px] font-medium tracking-wide hover:shadow";
const styleBtnBlue =
  "text-white !bg-blue hover:!opacity-[0.6] mx-0 py-[4px] px-[8px] rounded-[4px] !font-semibold tracking-wide hover:shadow";
const styleBtnYellow =
  "text-white !bg-yellow hover:!opacity-[0.6]] mx-0 py-[4px] px-[8px] rounded-[4px] !font-semibold tracking-wide hover:shadow";
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
            "mr-2",
            btnIconClass
          )}
        ></i>
        {title}
      </button>
    </Tooltip>
  );
};
