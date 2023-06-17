import { ErrorMessage } from "@hookform/error-message";
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
import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  StylesConfig,
} from "react-select";
import { TFieldSelect } from "~/types/field";
import { _format } from "~/utils";

type TProps<TFieldValues, TFieldDatas> = {
  data: TFieldDatas[];
  select?: {
    [P in keyof TFieldSelect<TFieldDatas>]: TFieldSelect<TFieldDatas>[P];
  };
  defaultValue?: Partial<TFieldDatas> | TSmallPackage;
  required?: boolean;
  name: Path<TFieldValues>;
  label?: string;
  placeholder: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  menuPlacement?: "auto" | "bottom" | "top";
  selectClassName?: string;
  hideError?: boolean;
  selectContainerClassName?: string;
  isClearable?: boolean;
  menuPortalTarget?: HTMLElement;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>;
  disabled?: boolean;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
  itemIsValue?: boolean;
  callback?: (val?: number) => Promise<any> | void;
  isLoading?: boolean;
  indicatorSeparator?: React.ComponentType<IndicatorSeparatorProps<unknown, boolean, GroupBase<unknown>>>;
};

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldDatas extends object = object
>({
  data,
  select = { label: "name", value: "id" },
  defaultValue,
  required = true,
  control,
  label,
  name,
  placeholder,
  rules,
  menuPlacement = "bottom",
  selectClassName,
  selectContainerClassName,
  hideError = false,
  isClearable = false,
  menuPortalTarget,
  styles,
  disabled = false,
  isMulti = false,
  closeMenuOnSelect = true,
  itemIsValue = false,
  isLoading = false,
  callback,
  indicatorSeparator = () => <span className="text-[#cfcfcf] !mx-2">|</span>,
}: TProps<TFieldValues, TFieldDatas>) => {
  const { label: l, value: v } = select;

  const [selected, setSelected] =
    React.useState<{ id: number; name: number | string }>(null);

  return (
    <div className={clsx("w-full", selectContainerClassName)}>
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
          <React.Fragment key={defaultValue?.[v as string]}>
            <Select
              instanceId={name}
              isMulti={isMulti}
              hideSelectedOptions={false}
              closeMenuOnSelect={closeMenuOnSelect}
              styles={{ ..._format.customStyles, ...styles }}
              isClearable={isClearable}
              isLoading={isLoading}
              menuPortalTarget={menuPortalTarget}
              theme={_format.customThemes}
              options={data}
              classNamePrefix={clsx({ "!border-warning: ": !_.isEmpty(error) })}
              getOptionLabel={(e) => (e as any)?.[l] || "unknow"}
              getOptionValue={(e) => (e as any)?.[v]}
              isDisabled={disabled}
              placeholder={placeholder}
              defaultValue={defaultValue}
              menuPlacement={menuPlacement}
              className={selectClassName}
              components={{ DropdownIndicator, IndicatorSeparator: indicatorSeparator }}
              onChange={
                !disabled &&
                ((opt: any) => {
                  if (Array.isArray(opt)) {
                    if (itemIsValue) {
                      onChange(opt);
                    } else {
                      const newOpt: number[] = opt?.map((item) => item?.[v]);
                      onChange(newOpt);
                    }
                  } else {
                    onChange(itemIsValue ? opt : opt?.[v]);
                  }
                  if (callback && !isMulti) {
                    setSelected(opt);
                    (callback(opt?.[v as string]) as any)?.catch(() =>
                      setSelected(selected)
                    );
                  }
                })
              }
              {...newField}
            />
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
    </div>
  );
};

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src="/icon/selecter-arrow.png" alt="" className="pr-2" />
    </components.DropdownIndicator>
  );
};
