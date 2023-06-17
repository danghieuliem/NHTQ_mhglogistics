import React, { useEffect, useRef } from "react";
import { Checkbox } from "antd";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import clsx from "clsx";
import { ErrorMessage } from "@hookform/error-message";

type TProps<TFieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  checkBoxClassName?: string;
  hideError?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: any;
  valueP?: boolean;
};

export const FormCheckbox = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  rules,
  control,
  checkBoxClassName,
  hideError,
  disabled,
  onChange,
  valueP,
  defaultChecked,
}: TProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, ...newField }, formState: { errors } }) => (
        <React.Fragment>
          <Checkbox
            disabled={disabled}
            className={clsx(checkBoxClassName, "text-base")}
            {...newField}
            checked={value}
            defaultChecked={defaultChecked}
          >
            {label}
          </Checkbox>
          {!hideError && (
            <ErrorMessage
              errors={errors}
              name={name as any}
              render={({ message }) => (
                <p className="text-warning text-xs font-medium mt-1">
                  {message}
                </p>
              )}
            />
          )}
        </React.Fragment>
      )}
    />
  );
};
