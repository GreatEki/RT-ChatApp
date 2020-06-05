import React, { useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import Message from './Message/Message';

import './messagesArea.css';

const MessagesArea = () => {
	const { chatMessages } = useContext(GeneralContext);

	return (
		<div className='messageArea scrollable'>
			{chatMessages.map((message, i) => (
				<div key={i}>
					{' '}
					<Message message={message} />{' '}
				</div>
			))}
		</div>
	);
};

export default MessagesArea;
