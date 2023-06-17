import {ErrorMessage} from "@hookform/error-message";
import clsx from "clsx";
import _ from "lodash";
import React, {useRef, useState} from "react";
import {Control, Controller, FieldValues, Path, RegisterOptions} from "react-hook-form";
import {components, DropdownIndicatorProps, GroupBase, StylesConfig} from "react-select";
import {AsyncPaginate} from "react-select-async-paginate";
import {useDeepEffect} from "~/hooks";
import {TFieldSelect} from "~/types/field";
import {_format} from "~/utils";

type TProps<TFieldValues, TFieldDatas> = {
	data: {
		options: TFieldDatas[];
		continueFetchAPI?: boolean;
		handleContinueFetchAPI?: (flag: boolean) => void;
		fetchAPI?: (pageIndex: number, SearchContent?: string) => Promise<TResponse<TPaginationResponse<TFieldDatas[]>>>;
	};
	select?: {
		[P in keyof TFieldSelect<TFieldDatas>]: TFieldSelect<TFieldDatas>[P];
	};
	defaultValue?: Partial<TFieldDatas>;
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
	isLoading?: boolean;
};

export const FormAsyncSelect = <TFieldValues extends FieldValues = FieldValues, TFieldDatas extends object = object>({
	data,
	select = {label: "name", value: "id"},
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
}: TProps<TFieldValues, TFieldDatas>) => {
	const {label: l, value: v} = select;

	const SearchContentArray = useRef<string[]>([]);
	const [SearchContent, setSearchContent] = useState<string>("");
	const firstFetchedData = useRef(false);
	const [options, setOptions] = useState<TFieldDatas[]>([]);

	useDeepEffect(() => {
		if (!firstFetchedData.current && !!data.options?.length) {
			firstFetchedData.current = true;
			setOptions(data.options);
		}
	}, [data.options]);

	const loadOptions = async (inputValue: string, prevOptions, {page}: {page: number}) => {
		let curOptions: TFieldDatas[] = [];
		let totalPage = 1;
		let hasMore = false;

		if (data?.continueFetchAPI && data?.fetchAPI && data?.handleContinueFetchAPI) {
			hasMore = true;
			try {
				if (SearchContent === inputValue) {
					if (data.continueFetchAPI === true) {
						const res = await data?.fetchAPI?.(page, inputValue);
						curOptions = res.Data?.Items;
						totalPage = res.Data.TotalPage;
						data?.handleContinueFetchAPI(res.Data.TotalPage > page);
					}

					if (prevOptions?.length < data.options?.length && !inputValue.length) {
						curOptions = _.differenceWith(data.options, prevOptions, _.isEqual) || [];
					}
				} else {
					if (!SearchContentArray.current.includes(inputValue.toLowerCase().trim())) {
						page = 1;
						const res = await data?.fetchAPI?.(page, inputValue);
						curOptions = res.Data?.Items;
						totalPage = res.Data.TotalPage;
						data?.handleContinueFetchAPI(res.Data.TotalPage > page);
					}
				}
			} catch (error) {}

			if (SearchContent !== inputValue) {
				if (!SearchContentArray.current.find((x) => x.toLowerCase() === inputValue.toLowerCase().trim())) {
					SearchContentArray.current = [...SearchContentArray.current, inputValue.toLowerCase().trim()];
				}
				setSearchContent(inputValue);
			}
		} else {
			hasMore = false;
			curOptions = data.options.filter((x) =>
				x?.[l as string].toLowerCase().trim().includes(inputValue.toLowerCase().trim())
			);
		}

		return {
			options: hasMore ? curOptions : [],
			hasMore,
			additional: {
				page: page + 1,
			},
		};
	};

	return (
		<div className={clsx("w-full", selectContainerClassName)}>
			{label && (
				<label className="text-[12px] py-[2px] uppercase font-bold" htmlFor={name}>
					{label} {required === true && <span className="text-red">*</span>}
				</label>
			)}
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({field: {value, onChange, ref, ...newField}, fieldState: {error}, formState: {errors}}) => (
					<React.Fragment key={JSON.stringify(options)}>
						<AsyncPaginate
							selectRef={ref}
							isLoading={isLoading}
							instanceId={name}
							isMulti={isMulti}
							hideSelectedOptions={false}
							closeMenuOnSelect={closeMenuOnSelect}
							classNamePrefix={clsx({"!border-warning ": !_.isEmpty(error)})}
							styles={{..._format.customStyles, ...styles}}
							isClearable={isClearable}
							menuPortalTarget={menuPortalTarget}
							theme={_format.customThemes}
							options={options}
							loadOptions={loadOptions}
							additional={{page: 2}}
							getOptionLabel={(e) => (e as any)?.[l]}
							getOptionValue={(e) => (e as any)?.[v]}
							isDisabled={disabled}
							placeholder={placeholder}
							defaultValue={defaultValue}
							menuPlacement={menuPlacement}
							className={selectClassName}
							components={{
								DropdownIndicator,
								LoadingIndicator: DropdownIndicator,
							}}
							onChange={
								!disabled &&
								((opt) => {
									if (Array.isArray(opt)) {
										if (itemIsValue) {
											onChange(opt);
										} else {
											const newOpt: number[] = opt?.map((item) => item?.[v as string]);
											onChange(newOpt);
										}
									} else {
										onChange(itemIsValue ? opt : opt?.[v as string]);
									}
								})
							}
							{...newField}
						/>
						{!hideError && (
							<ErrorMessage
								errors={errors}
								name={name as any}
								render={({message}) => <p className="text-warning text-xs font-medium mt-1">{message}</p>}
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
			<span className="h-full cursor-pointer px-3">
				<i className="text-[#6b6f82] text-base far fa-chevron-down"></i>
			</span>
		</components.DropdownIndicator>
	);
};
