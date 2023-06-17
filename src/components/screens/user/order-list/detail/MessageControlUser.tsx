import clsx from "clsx";
import moment from "moment";
import {useEffect, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {orderComment} from "~/api";
import {ChatBox, toast, ReceivedMessage, SendMessage} from "~/components";
import {useToggle} from "~/hooks";
import {selectConnection, useAppSelector} from "~/store";

export const MessageControlUser = ({clientId, mainOrderId}) => {
	const [chatbox, toggleChatBox] = useToggle();

	const [messages, setMessages] = useState<TMessage[]>([]);
	const pagination = {
		PageIndex: 1,
		PageSize: 10,
		OrderBy: "Created desc",
	};
	const connection = useAppSelector(selectConnection);
	const connectionId = connection?.connectionId;

	useEffect(() => {
		if (!connectionId) return;
		connection.on("broadcast-message-user", (newMessage: TMessage) => {
			if (newMessage?.MainOrderId != mainOrderId) return;
			setMessages((preState) => [...preState, newMessage]);
		});
	}, [connectionId]);

	const addMessage = async (newMessage) => {
		try {
			await orderComment.create({
				MainOrderId: mainOrderId,
				Comment: newMessage,
				Type: 1,
			});
		} catch (err) {
			toast.error(err);
		}
	};

	const {isFetchingNextPage, hasNextPage, fetchNextPage, isLoading} =
		useInfiniteQuery(
			["chat-with-admin", {mainOrderId}],
			async ({pageParam = pagination.PageIndex}) => {
				const res = await orderComment.getList({
					PageIndex: pageParam,
					PageSize: pagination.PageSize,
					mainOrderId,
					type: 1,
					OrderBy: pagination.OrderBy,
				});
				return res.Data;
			},
			{
				getNextPageParam: (lastPage, allPages) => {
					if (lastPage.PageIndex >= lastPage.TotalPage) return undefined;
					return lastPage.PageIndex + 1;
				},
				onSuccess: (data) => {
					if (!data.pages.length) return;
					const localMessagesIds = messages.map((item) => item.Id);
					const lastPage = data.pages[data.pages.length - 1].Items;
					const filteredLastPage = lastPage.filter((item) => {
						if (localMessagesIds.includes(item.Id)) return false;
						localMessagesIds.push(item.Id);
						return true;
					});
					if (!filteredLastPage.length) return;
					setMessages((preState) =>
						sortMessageByNewestDate([...preState, ...filteredLastPage])
					);
				},
			}
		);

	return (
		<>
			<div
				className={clsx(
					"bottom-[32px] right-[80px] flex-row-reverse fixed flex grid-cols-2 h-[440px] z-[9999]",
					{
						"translate-y-[390px]": !chatbox,
					}
				)}>
				<div className="col-span-1 w-[340px]">
					<div className={clsx("ease-linear z-100 duration-300")}>
						<ChatBox
							onOpenChat={toggleChatBox}
							loading={isLoading}
							name="Admin"
							data={messages}
							addUserMessage={addMessage}
							isFetchingNextPage={isFetchingNextPage}
							hasNextPage={hasNextPage}
							fetchNextPage={fetchNextPage}>
							{messages?.map((message) => {
								if (message.UID !== clientId)
									return (
										<ReceivedMessage
											userName={message.UserName}
											content={message.Comment}
											key={message.Id}
											time={message.Created}
										/>
									);

								return (
									<SendMessage
										userName={message.UserName}
										key={message.Id}
										content={message.Comment}
										time={message.Created}
									/>
								);
							})}
						</ChatBox>
					</div>
				</div>
			</div>
		</>
	);
};

const sortMessageByNewestDate = (array: TMessage[]) => {
	return array.sort(
		(a, b) => moment(a.Created).valueOf() - moment(b.Created).valueOf()
	);
};
