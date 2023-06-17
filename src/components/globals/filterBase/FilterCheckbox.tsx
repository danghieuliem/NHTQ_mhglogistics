import React, { FC } from "react";
import { Checkbox } from "antd";

type TProps = {
  label: string;
  checked?: boolean;
  onChange: () => void;
};

export const FilterCheckbox: FC<TProps> = ({ label, ...newProps }) => {
  return <Checkbox {...newProps}>{label}</Checkbox>;
};
