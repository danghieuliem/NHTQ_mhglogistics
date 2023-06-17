import {_format} from "~/utils";

type TProps = {
	isSender?: boolean;
	content: string;
	time?: Date;
	userName: string;
};

export const SendMessage = ({content, time, userName}: TProps) => {
	return (
		<div className="ml-8 flex justify-end">
			<div>
				<div className="text-[10px] mr-2 mt-[4px] text-[#333] text-right">{userName}</div>
				<div className="bg-blueLight p-[12px] text-sm rounded-b-3xl rounded-l-3xl justify-end">
					{content}
				</div>
				<span className="text-[10px] mr-2 mt-[4px] text-[#333]">
					{_format.getVNDate(time)}
				</span>
			</div>
		</div>
	);
};
