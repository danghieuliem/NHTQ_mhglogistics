import { ErrorMessage } from "@hookform/error-message";
import { Input } from "antd";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type TProps<TFieldValues> = {
  required?: boolean;
  name: Path<TFieldValues>;
  label?: string;
  placeholder: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  rows?: number;
  disabled?: boolean;
  hideError?: boolean;
  inputClassName?: string;
  onEnter?: () => void;
  autoSize?:  boolean | object;
};

export const FormTextarea = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  placeholder,
  rules,
  control,
  rows = 4,
  required = true,
  disabled = false,
  hideError = false,
  inputClassName,
  onEnter,
  autoSize
}: TProps<TFieldValues>) => {
  return (
    <div className="w-full relative">
      {label && (
        <label
          className="text-[12px] py-[2px] font-bold text-label"
          htmlFor={name}
        >
          {label} {required === true && <span className="text-red">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => (
          <div>
            <Input.TextArea
              rows={rows}
              autoSize={autoSize}
              placeholder={placeholder}
              onChange={!disabled && onChange}
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  onEnter?.();
                }
              }}
              {...newField}
              className={clsx(
                "!rounded-[8px]",
                disabled &&
                  "cursor-not-allowed !border-[#dedede] !bg-[#f5f5f5] hover:!border-[#d9d9d9]",
                { "!border-warning": !_.isEmpty(error) },
                inputClassName
              )}
            />
            {hideError === true && (
              <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                  <p className="text-warning text-xs font-medium mt-1 absolute top-0 right-0">
                    {message}
                  </p>
                )}
              />
            )}
          </div>
        )}
      />
    </div>
  );
};
