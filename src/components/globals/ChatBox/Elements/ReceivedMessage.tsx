import {_format} from "~/utils";

type TProps = {
	content: string;
	time?: Date;
	userName: string;
};

export const ReceivedMessage = ({content, time, userName}: TProps) => {
	return (
		<div className="mr-8 flex">
			<div>
				<div className="text-[10px] ml-2 mb-[4px] text-[#333]">{userName}</div>
				<div className="bg-chat p-[12px] text-sm text-white rounded-b-3xl rounded-r-3xl justify-start">
					{content}
				</div>
				<span className="text-[10px] ml-2 mt-[4px] text-[#333]">
					{_format.getVNDate(time)}
				</span>
			</div>
		</div>
	);
};
