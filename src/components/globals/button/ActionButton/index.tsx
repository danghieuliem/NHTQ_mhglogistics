import { Tooltip } from "antd";
import clsx from "clsx";
import { FC } from "react";

type TProps = {
  icon: string;
  title: string;
  onClick?: () => void;
  iconContainerClassName?: string;
  btnGreen?: boolean;
  btnRed?: boolean;
  btnYellow?: boolean;
  btnViolet?: boolean;
  btnBlue?: boolean;
  disabled?: boolean;
  isButton?: boolean;
  isButtonClassName?: string;
};

const btnStyleGreen = "text-[#1f8f2b]";
const btnStyleRed = "text-[#f02b02] ";
const btnStyleYellow = "text-[#edb90e]  ";
const btnStyleViolet = "text-[#7410b3]";
const btnStyleBlue = "text-[#119ff5]";

export const ActionButton: FC<TProps> = ({
  icon,
  iconContainerClassName,
  title,
  onClick,
  btnGreen,
  btnRed,
  btnYellow,
  btnViolet,
  btnBlue,
  disabled,
  isButton,
  isButtonClassName,
  ...props
}) => {
  
  return isButton === true ? (
    <div
      {...props}
      className={clsx("my-[2px] w-fit flex justify-between items-center border py-[5px] px-[8px] shadow-md hover:shadow-none transition-all duration-300 rounded-[4px] cursor-pointer text-[#061d49] hover:bg-[#061d49] hover:!text-[#fff]", isButtonClassName)}
      style={{
        opacity: disabled ? "0.3" : "1",
        pointerEvents: disabled ? "none" : "all",
      }}
      onClick={onClick}
    >
      <i className={clsx(icon, "text-[16px] mr-1")}></i>
      <span>{title}</span>
    </div>
  ) : (
    <Tooltip title={disabled ? "" : title}>
      <div
        {...props}
        className="group inline-block p-1 w-fit"
        style={{
          opacity: disabled ? "0.3" : "1",
          pointerEvents: disabled ? "none" : "all",
        }}
      >
        <div className="cursor-pointer" onClick={onClick}>
          <div
            className={clsx(
              " transition duration-300 text-center p-2 pt-[6px] h-8 mr-1 rounded-md text-[#27A689]",
              iconContainerClassName,
              btnGreen && btnStyleGreen,
              btnRed && btnStyleRed,
              btnYellow && btnStyleYellow,
              btnViolet && btnStyleViolet,
              btnBlue && btnStyleBlue
            )}
          >
            <i
              className={clsx(icon, " transition duration-300 h-4 text-[16px]")}
            ></i>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};
