import {ErrorMessage} from "@hookform/error-message";
import {Upload} from "antd";
import {UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import clsx from "clsx";
import React, {useState} from "react";
import {Control, FieldValues, Path, RegisterOptions, useController} from "react-hook-form";
import {baseFile} from "~/api";
import {toast} from "~/components/toast";
import {useDeepEffect} from "~/hooks";
import {_format} from "~/utils";

type TProps<TFieldValues> = React.PropsWithChildren<{}> & {
	required?: boolean;
	name: Path<TFieldValues>;
	label?: string;
	rules?: RegisterOptions;
	control: Control<TFieldValues, object>;
	maxCount?: number;
	listType?: "picture" | "picture-card" | "text";
	image?: boolean;
	className?: string;
	fileType?: string | string[];
	messsageFileType?: string;
	messsageFileMB?: string;
	mb?: number;
	disabled?: boolean;
};

export const FormUpload = <TFieldValues extends FieldValues = FieldValues>({
	control,
	label,
	name,
	required = true,
	rules,
	maxCount = 1,
	listType = "picture-card",
	children,
	image = false,
	className,
	fileType = ["image/jpeg", "image/png"],
	messsageFileMB,
	messsageFileType,
	mb = 2,
	disabled = false,
}: TProps<TFieldValues>) => {
	const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState<string | UploadFile[]>([]);
	const [firstRender, setFirstRender] = useState(false);

	const {
		field: {value, onChange, onBlur, ...newField},
		formState: {errors},
	} = useController({
		name,
		control,
		rules,
	});

	useDeepEffect(() => {
		if (!firstRender) {
			if (!!value?.length && typeof value === "string") {
				if (image) {
					setFileList(value);
				} else {
					setFileList([
						{
							uid: "-1",
							url: value,
							name: value,
							status: "done",
						},
					]);
				}
				setFirstRender(true);
			}
		}
	}, [value]);

	const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
		if (loading) return;
		// if (info?.file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		// 	setFileList([...info.fileList]);
		// 	onChange(info?.file);
		// 	return;
		// };
		try {
			setLoading(true);
			if (info.file?.status === "removed") {
				onChange("");
			}
			// hiện đang xử lý 1 file, nào nhiều file tính tiếp
			if (info.file?.status === "uploading") {
				const res = await baseFile.uploadFile(info.file?.originFileObj);
				if (!res.Success) return;
				onChange(res.Data);
				info.file.status = "done";
			}
			if (image) {
				_format.getBase64(info.file?.originFileObj, (image) => setFileList(image));
			} else {
				setFileList([...info.fileList]);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<React.Fragment>
			{label && (
				<label className="text-[12px] py-[2px] uppercase font-bold" htmlFor={name}>
					{label} {required === true && <span className="text-red">*</span>}
				</label>
			)}
			<div>
				<Upload
					{...newField}
					onChange={(info) => {
						if (info.file.size / 1024 / 1024 < mb) {
							handleChange(info);
						}
					}}
					disabled={disabled}
					listType={listType}
					onPreview={_format.previewImage}
					beforeUpload={(file) => _format.beforeUpload(file, fileType, mb, messsageFileType, messsageFileMB)}
					className={className}
					maxCount={maxCount}
					showUploadList={!image}
					fileList={!image && typeof fileList !== "string" ? fileList : undefined}
				>
					{loading ? (
						"Đang tải..."
					) : image && maxCount === 1 && typeof fileList === "string" ? (
						<img
							src={fileList}
							alt="error"
							style={{width: 82, height: 82, borderRadius: 20}}
							className="object-cover"
						/>
					) : (
						children ?? <i className={clsx("far fa-plus", "text-xl")}></i>
					)}
				</Upload>
				<ErrorMessage
					errors={errors}
					name={name as any}
					render={({message}) => <p className="text-warning text-xs font-medium mt-1">{message}</p>}
				/>
			</div>
		</React.Fragment>
	);
};
