import React, { useContext } from 'react';
import './message.css';
import { GeneralContext } from '../../../contexts/GeneralContext';

const Message = ({ message: { sender, msgContent } }) => {
	const { verifiedUser } = useContext(GeneralContext);

	const currentUser = verifiedUser.userName;

	if (sender === currentUser) {
		return (
			<div className='messageContainer justifyEnd'>
				<div className='userMessageBox d-flex justify-content-end'>
					<p className='userText text-justify'> {msgContent} </p>
				</div>
			</div>
		);
	} else {
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
