import React, { useContext } from 'react';
import './message.css';
import { GeneralContext } from '../../../contexts/GeneralContext';

const Message = ({ message: { sender, msgContent } }) => {
	const { name } = useContext(GeneralContext);

	let isSentByCurrentUser = false;

	const userName = name.trim().toLowerCase();

	if (sender === userName) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div className='messageContainer justifyEnd'>
			<div className='userMessageBox'>
				{/* <p className='userIcon text-right'>
					{' '}
					{userName} <i className='fas fa-user '> </i>
				</p> */}
				<span className='userText'> {msgContent} </span>
			</div>
		</div>
	) : (
		<div className='messageContainer justifyStart'>
			<div className='groupUserMessageBox'>
				<span className='groupUsersIcon'>
					{' '}
					<i className='fas fa-user '> </i> {sender}{' '}
				</span>
				<span className='groupUserText'> {msgContent} </span>
			</div>
		</div>
	);
};

export default Message;
