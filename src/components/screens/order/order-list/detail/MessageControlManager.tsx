import clsx from "clsx";
import moment from "moment";
import {useEffect, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {orderComment} from "~/api";
import {ChatBox, ReceivedMessage, SendMessage, toast} from "~/components";
import {useToggle} from "~/hooks";
import {selectConnection, useAppSelector} from "~/store";

export const MessageControlManager = ({clientId, mainOrderId}) => {
	const userNew = useAppSelector((state) => state.user.current);
	if (!userNew) return <></>;

	const [chatboxCustomer, toggleChatBoxCustomer] = useToggle();
	const [chatboxLocal, toggleChatBoxLocal] = useToggle();

	const [customerMessages, setCustomerMessages] = useState<TMessage[]>([]);
	const [localMessages, setLocalMessages] = useState<TMessage[]>([]);
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
			setCustomerMessages((preState) => [...preState, newMessage]);
		});

		connection.on("broadcast-message-internal", (newMessage: TMessage) => {
			if (newMessage?.MainOrderId != mainOrderId) return;
			setLocalMessages((preState) => [...preState, newMessage]);
		});
	}, [connectionId]);

	const addAnswerCustomerMessage = async (newMessage) => {
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

	const addAnswerLocalMessage = async (newMessage) => {
		try {
			await orderComment.create({
				MainOrderId: mainOrderId,
				Comment: newMessage,
				Type: 2,
			});
		} catch (err) {
			toast.error(err);
		}
	};

	const {
		isFetchingNextPage: isFetchingNextCustomerPage,
		hasNextPage: hasNextPageCustomer,
		fetchNextPage: fetchNextPageCustomer,
		isLoading: isLoadingCustomer,
	} = useInfiniteQuery(
		["chat-with-customer", {mainOrderId}],
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
				const customerMessagesIds = customerMessages.map((item) => item.Id);
				const lastPage = data.pages[data.pages.length - 1].Items;
				const filteredLastPage = lastPage.filter((item) => {
					if (customerMessagesIds.includes(item.Id)) return false;
					customerMessagesIds.push(item.Id);
					return true;
				});
				if (!filteredLastPage.length) return;
				setCustomerMessages((preState) => sortMessageByNewestDate([...preState, ...filteredLastPage]));
			},
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	const {
		isFetchingNextPage: isFetchingNextPageLocal,
		hasNextPage: hasNextPageLocal,
		fetchNextPage: fetchNextPageLocal,
		isLoading: isLoadingLocal,
	} = useInfiniteQuery(
		["chat-with-local", {mainOrderId}],
		async ({pageParam = pagination.PageIndex}) => {
			const res = await orderComment.getList({
				PageIndex: pageParam,
				PageSize: pagination.PageSize,
				mainOrderId,
				type: 2,
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
				const localMessagesIds = localMessages.map((item) => item.Id);
				const lastPage = data.pages[data.pages.length - 1].Items;
				const filteredLastPage = lastPage.filter((item) => {
					if (localMessagesIds.includes(item.Id)) return false;
					localMessagesIds.push(item.Id);
					return true;
				});
				if (!filteredLastPage.length) return;
				setLocalMessages((preState) => sortMessageByNewestDate([...preState, ...filteredLastPage]));
			},
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<>
			<div
				className={clsx("bottom-[32px] right-[80px] flex-row-reverse fixed flex grid-cols-2 h-[440px] z-[9999]", {
					"translate-y-[390px]": !chatboxLocal,
				})}
			>
				<div className="col-span-1 w-[340px]">
					<div className={clsx("ease-linear z-100 duration-300")}>
						<ChatBox
							onOpenChat={toggleChatBoxLocal}
							loading={isLoadingLocal}
							name="Nội bộ"
							data={localMessages}
							addUserMessage={addAnswerLocalMessage}
							isFetchingNextPage={isFetchingNextPageLocal}
							hasNextPage={hasNextPageLocal}
							fetchNextPage={fetchNextPageLocal}
						>
							{localMessages?.map((message) => {
								if (message.UID !== userNew?.UserId)
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

			<div
				className={clsx("bottom-[32px] right-[400px] flex-row-reverse fixed flex grid-cols-2 h-[440px] z-[9999]", {
					"translate-y-[390px]": !chatboxCustomer,
				})}
			>
				<div className="col-span-1 w-[340px]">
					<div className={clsx("ease-linear z-100 duration-300")}>
						<ChatBox
							onOpenChat={toggleChatBoxCustomer}
							loading={isLoadingCustomer}
							name="Khách hàng"
							data={customerMessages}
							addUserMessage={addAnswerCustomerMessage}
							fetchNextPage={fetchNextPageCustomer}
							hasNextPage={hasNextPageCustomer}
							isFetchingNextPage={isFetchingNextCustomerPage}
						>
							{customerMessages?.map((message) => {
								if (message.UID === clientId)
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
	return array.sort((a, b) => moment(a.Created).valueOf() - moment(b.Created).valueOf());
};
