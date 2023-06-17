export const HeaderChat = ({onOpenChat, name}) => {
	return (
		<div
			className={`grid-cols-3 p-2 rounded-t-md flex justify-between hover:cursor-pointer items-center bg-chat`}
			onClick={() => onOpenChat()}
		>
			<span className="mr-2 py-1.5 col-span-2 font-semibold text-white uppercase flex items-center !leading-[initial]">{name}</span>
		</div>
	);
};
