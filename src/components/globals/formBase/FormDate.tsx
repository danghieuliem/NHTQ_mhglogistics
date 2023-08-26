import { ErrorMessage } from "@hookform/error-message";
import { DatePicker } from "antd";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
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
  picker?: "date" | "month" | "quarter" | "time" | "week" | "year";
  format?: string;
};

export const FormDate = <TFieldValues extends FieldValues = FieldValues>({
  label,
  placeholder,
  name,
  rules,
  control,
  picker,
  required = true,
  format = "DD/MM/YYYY",
}: TProps<TFieldValues>) => {
  return (
    <React.Fragment>
      {label && (
        <label
          className="text-[12px] py-[2px] font-bold"
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
          field: { value, onChange, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => (
          <div className="w-full !rounded-[4px]">
            <DatePicker
              value={value && moment(new Date(value), format)}
              format={format}
              onChange={(date) => {
                onChange(!!date ? moment(date).format() : date);
              }}
              picker={picker}
              style={{ height: 40, width: "100%", borderRadius: '4px'}}
              placeholder={placeholder}
              {...newField}
              className={clsx({ "!border-warning ": !_.isEmpty(error) })}
            />
            <ErrorMessage
              errors={errors}
              name={name as any}
              render={({ message }) => (
                <p className="text-warning text-xs font-medium mt-1">
                  {message}
                </p>
              )}
            />
          </div>
        )}
      />
    </React.Fragment>
  );
};
