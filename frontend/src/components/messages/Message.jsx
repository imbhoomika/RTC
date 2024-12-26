import React from 'react';

const Message = ({ profilePic, messageText, timestamp }) => {
	return (
		<div className="chat chat-end">
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="User avatar" src={profilePic} />
				</div>
			</div>
			<div className="chat-bubble text-white bg-blue-500">Hey whatsup</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
				{timestamp}
			</div>
		</div>
	);
};

export default Message;
