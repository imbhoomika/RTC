import React from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
//import { useAuthContext } from "./AuthContext"; // Ensure this is correctly implemented

const MessageContainer = ({ selectedConversation }) => {
	return (
		<div className="md:min-w-[450px] flex flex-col">
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className="bg-slate-500 px-4 py-2 mb-2">
						<span className="label-text">To:</span>{" "}
						<span className="text-gray-900 font-bold">{selectedConversation.name}</span>
					</div>

					{/* Messages and Input */}
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	//const { authUser } = useAuthContext(); // Ensure `useAuthContext` returns authUser properly
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
				<p>Welcome 👋 John Doe ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl md:text-6xl text-center" />
			</div>
		</div>
	);
};

export default MessageContainer;
