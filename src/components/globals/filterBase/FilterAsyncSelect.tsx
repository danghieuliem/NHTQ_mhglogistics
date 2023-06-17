import React from "react";
import {
  components,
  DropdownIndicatorProps,
  GroupBase,
  StylesConfig,
} from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { TFieldSelect } from "~/types/field";
import { _format } from "~/utils";

type TProps<TFieldValues> = {
  data: {
    options: TFieldValues[];
    callback?: (page: number) => TFieldValues[];
  };
  placeholder: string;
  select?: {
    [P in keyof TFieldSelect<TFieldValues>]: TFieldSelect<TFieldValues>[P];
  };
  handleSearch?: (val: string | number | (string | number)[]) => void;
  handleSubmit?: (val: string | number | (string | number)[]) => void;
  isMulti?: boolean;
  defaultValue?: TFieldValues;
  closeMenuOnSelect?: boolean;
  menuPlacement?: "auto" | "bottom" | "top";
  menuPortalTarget?: HTMLElement;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>;
  pagination?: boolean;
  isClearable?: boolean;
};

export const FilterAsyncSelect = <TFieldValues extends object = object>({
  data,
  placeholder,
  select = { label: "name", value: "id" },
  handleSearch,
  handleSubmit,
  isMulti = false,
  defaultValue,
  closeMenuOnSelect = true,
  menuPlacement = "auto",
  menuPortalTarget,
  styles,
  pagination = false,
  isClearable = false,
}: TProps<TFieldValues>) => {
  const { label: l, value: v } = select;

  const id = React.useRef<null | number | number[]>(null);
  const handleId = (val: number | number[]) => (id.current = val);

  const [loading, setLoading] = React.useState(false);

  const loadOptions = async (
    inputValue: string,
    _,
    { page }: { page: number }
  ) => {
    setLoading(true);
    let currentData = JSON.parse(JSON.stringify(data));
    currentData.options = currentData?.options?.filter(
      (x) =>
        x?.[l as string]
          ?.toString()
          .toLowerCase()
          ?.includes(inputValue.toLowerCase()) ||
        x?.[v as string]
          ?.toString()
          .toLowerCase()
          ?.includes(inputValue.toLowerCase())
    );
    setLoading(false);

    return {
      ...currentData,
      hasMore: true,
      additional: pagination ? { page: page + 1 } : undefined,
    };
  };

  return (
    <div className="relative">
      <div className="absolute -top-3 left-4 text-xs bg-white p-1 z-10">
        {placeholder}
      </div>
      <AsyncPaginate
        instanceId="id-select"
        isMulti={isMulti}
        placeholder=""
        isClearable={isClearable}
        menuPortalTarget={menuPortalTarget}
        menuPlacement={menuPlacement}
        hideSelectedOptions={false}
        closeMenuOnSelect={closeMenuOnSelect}
        styles={{ ..._format.customStyles, ...styles }}
        getOptionLabel={(e) => (e as any)?.[l]}
        getOptionValue={(e) => (e as any)?.[v]}
        theme={_format.customThemes}
        isLoading={loading}
        defaultValue={defaultValue}
        loadOptions={loadOptions}
        additional={{ page: 1 }}
        onChange={(opt) => {
          if (Array.isArray(opt)) {
            const newOpt: number[] = opt?.map((item) => item?.[v as string]);
            handleSubmit ? handleId(newOpt) : handleSearch(newOpt);
          } else {
            handleSubmit
              ? handleId(opt?.[v as string])
              : handleSearch(opt?.[v as string]);
          }
        }}
        components={{
          DropdownIndicator: (props: DropdownIndicatorProps) =>
            handleSubmit ? (
              <SearchIndicator
                {...props}
                handleSubmit={() => handleSubmit(id.current)}
              />
            ) : (
              <DropdownIndicator {...props} />
            ),
        }}
      />
    </div>
  );
};

const SearchIndicator: React.FC<
  DropdownIndicatorProps & { handleSubmit: () => void }
> = ({ children, handleSubmit, ...rest }) => {
  return (
    <components.DropdownIndicator {...rest}>
      <span onClick={handleSubmit} className="h-full cursor-pointer px-3">
        <i className="text-[#6b6f82] text-base fal fa-search"></i>
      </span>
    </components.DropdownIndicator>
  );
};

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <span className="h-full cursor-pointer px-3">
        <i className="text-[#6b6f82] text-base far fa-chevron-down"></i>
      </span>
    </components.DropdownIndicator>
  );
};

