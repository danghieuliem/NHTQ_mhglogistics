import {Input} from "antd";
import clsx from "clsx";
import React, {FC, useCallback, useRef} from "react";
import {_format} from "~/utils";

type TProps = {
	name: string;
	value?: string;
	id: string;
	handleSubmit?: (val: string) => void;
	handleSearch?: (val: string) => void;
	placeholder: string;
	type?: "text" | "number";
	inputClassName?: string;
	defaultValue?: string | number;
	prefix?: React.ReactNode;
	allowClear?: boolean;
	label?: string;
};

export const FilterInput: FC<TProps> = ({
	id,
	placeholder,
	name,
	handleSubmit,
	handleSearch,
	type,
	value,
	inputClassName,
	defaultValue,
	prefix,
	allowClear = true,
	label
}) => {
	const input = useRef("");
	const handleInput = useCallback((val: string) => (input.current = val), []);
	return (
		<div className="">
			<div className={clsx("text-[10px] py-[2px] uppercase font-bold", prefix && "left-12")}>
				{label}
			</div>
			<Input
				className={clsx(
					"h-10 border border-[#0000003a] w-full !rounded-0 pl-2",
					!handleSearch ? "pr-12" : "pr-4",
					inputClassName
				)}
				type={type}
				value={value}
				defaultValue={defaultValue}
				prefix={prefix}
				suffix={
					!handleSearch &&
					handleSubmit && (
						<div
							onClick={() => handleSubmit(input.current)}
							className="absolute right-0 top-0 h-10 px-3 cursor-pointer flex items-center justify-center"
						>
							<span className="leading-9 border-l pl-[10px] border-[#d9d9d9]">
								<i className="fal fa-search text-base"></i>
							</span>
						</div>
					)
				}
				id={id}
				name={name}
				onChange={(e) => {
					handleSearch ? handleSearch(e.target.value) : handleInput(e.target.value);
				}}
				onKeyPress={(e) => {
					handleSubmit && e.code === "Enter" && handleSubmit(input.current);
				}}
				allowClear={allowClear}
				placeholder={placeholder}
			/>
		</div>
	);
};
