import React from "react";
import {Switch} from "antd";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

type TProps<TFieldValues> = {
	required?: boolean;
	name: Path<TFieldValues>;
	label?: string;
	rules?: RegisterOptions;
	control: Control<TFieldValues, object>;
	hideText?: boolean;
};

export const FormSwitch = <TFieldValues extends FieldValues = FieldValues>({
	control,
	name,
	label,
	required,
	rules,
	hideText = false,
}: TProps<TFieldValues>) => {
	return (
		<div className="">
			{label && (
				<label
					className="text-[12px] py-[2px] uppercase font-bold"
					htmlFor={name}>
					{label} {required === true && <span className="text-red">*</span>}
				</label>
			)}
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({field: { value, ...newField}, formState: {errors}}) => (
					<div className="w-full">
						<div className="flex items-center">
							{!hideText && <div className="text-base">Ẩn</div>}
							<div className="mx-2">
								<Switch
									checked={value}
									{...newField}
								/>
							</div>
							{!hideText && <div className="text-base">Hiện</div>}
						</div>
						<ErrorMessage
							errors={errors}
							name={name as any}
							render={({message}) => (
								<p className="text-warning text-xs font-medium mt-1">
									{message}
								</p>
							)}
						/>
					</div>
				)}
			/>
		</div>
	);
};
