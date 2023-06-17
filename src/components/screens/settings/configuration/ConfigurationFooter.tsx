import React, { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormEditor } from '~/components';

type TProps<T extends object = object> = {
	control: Control<T, object>;
	data: T;
};

export const ConfigurationFooter: FC<TProps<TConfig5>> = ({
	control,
	data
}) => {
	return (
		<React.Fragment>
			<div className="grid grid-cols-1 gap-4 px-6">
				<div className="text-base text-[#454646dd] uppercase py-2 font-semibold w-fit">
					Cấu hình footer
				</div>
				<div className="col-span-1">
					<FormEditor
						control={control}
						name="FooterLeft"
						label="Nội dung thông báo Popup"
						required={false}
					/>
				</div>
				<div className="col-span-1">
					<FormEditor
						control={control}
						name="FooterRight"
						label="Nội dung thông báo Popup"
						required={false}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};
