import React, { useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { GeneralContext } from '../../contexts/GeneralContext';
import Message from './Message/Message';

const MessagesArea = () => {
	const { chatMessages, name } = useContext(GeneralContext);

	return (
		<ScrollToBottom>
			{chatMessages.map((message, i) => (
				<div key={i}>
					{' '}
					<Message message={message} />{' '}
				</div>
			))}
		</ScrollToBottom>
	);
};

export default MessagesArea;
