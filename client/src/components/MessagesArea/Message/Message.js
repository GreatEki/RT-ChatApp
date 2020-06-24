import React, { useContext } from 'react';
import './message.css';
import { GeneralContext } from '../../../contexts/GeneralContext';

const Message = ({ message: { sender, msgContent } }) => {
	const { verifiedUser, foundContact } = useContext(GeneralContext);

	// const { userName } = verifiedUser;
	const currentUser = verifiedUser.userName;
	const contactUser = foundContact.username;

	let isSentByCurrentUser = false;

	// userName = userName.trim().toLowerCase();
	// console.log(sender);
	// console.log(userName);

	if (sender === currentUser) {
		// isSentByCurrentUser = true;
		return (
			<div className='messageContainer justifyEnd'>
				<div className='userMessageBox d-flex justify-content-end'>
					<p className='userText text-justify'> {msgContent} </p>
				</div>
			</div>
		);
	} else {
		// isSentByCurrentUser = false;
		return (
			<div className='messageContainer justifyStart'>
				<div className='groupUserMessageBox d-flex flex-column'>
					<span className='groupUsersIcon'>
						{' '}
						<i className='fas fa-user '> </i> {sender}{' '}
					</span>
					<span className='groupUserText text-justify text-wrap '>
						{' '}
						{msgContent}{' '}
					</span>
				</div>
			</div>
		);
	}
};

export default Message;
