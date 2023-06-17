import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

type TDate = [moment.Moment | null, moment.Moment | null];

type TProps = {
	placeholder: string;
	defaultValue?: TDate;
	handleDate: (val: (string | null)[]) => void;
	format?: string;
	showTime?: boolean;
	disabled?: boolean;
};

export const FilterRangeDate: React.FC<TProps> = ({
	handleDate,
	placeholder,
	defaultValue,
	format = 'DD/MM/YYYY',
	showTime = false,
	disabled
}) => {
	const [date, setDate] = React.useState<TDate>(defaultValue || [null, null]);
	const [blur, setBlur] = useState(false);
	const onChangeDate = (dates: TDate | null) => {
		// console.log(dates);

		if (dates === null) {
			setDate([null, null]);
			handleDate([null, null]);
		} else {
			setDate(dates);
			handleDate(dates?.map((date) => (date ? moment(date).format("YYYY-MM-DD") : null)));
		}
	};

	return (
		<div className="relative" key={!blur ? 1 : new Date().getTime()}>
			<div className="text-[10px] py-[2px] font-bold">
				{placeholder}
			</div>
			<DatePicker.RangePicker
				disabled={disabled}
				showTime={showTime}
				format={format}
				className="h-10 w-full !rounded-[8px]"
				// onBlur={(dates) =>
				// console.log(moment.unix(dates.timeStamp * 1000).format('MM/DD/YYYY'))
				// }
				onCalendarChange={onChangeDate}
				value={date}
			/>
		</div>
	);
};
