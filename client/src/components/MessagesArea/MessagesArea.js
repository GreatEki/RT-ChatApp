import React, { useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { GeneralContext } from '../../contexts/GeneralContext';
import Message from './Message/Message';

import './messagesArea.css';

const MessagesArea = () => {
	const { chatMessages, name } = useContext(GeneralContext);

	return (
		<ScrollToBottom className='messageArea scrollable-child'>
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
