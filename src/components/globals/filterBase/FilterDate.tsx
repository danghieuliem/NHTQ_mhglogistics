import React, { FC } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const styles = {
  height: 40,
  width: "100%",
};

type TProps = {
  handleDate: (date: string | null) => void;
  placeholder: string;
  picker?: "date" | "month" | "quarter" | "time" | "week" | "year";
  format?: string;
  showTime?: boolean;
};

export const FilterDate: FC<TProps> = ({
  handleDate,
  placeholder,
  picker = "date",
  format = "DD/MM/YYYY",
  showTime,
}) => {
  return (
    <div className="relative">
      <div className="absolute -top-3 left-4 text-xs bg-white p-1 z-10">
        {placeholder}
      </div>
      <DatePicker
        showTime={showTime}
        format={format}
        picker={picker}
        style={styles}
        placeholder=""
        onChange={(date) =>
          date ? handleDate(moment(date).format()) : handleDate(null)
        }
      />
    </div>
  );
};
