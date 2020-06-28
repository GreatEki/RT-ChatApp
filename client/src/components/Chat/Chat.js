import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { GeneralContext } from '../../contexts/GeneralContext';

import { server } from '../../config/config';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import MessagesArea from '../MessagesArea/MessagesArea';

import './chat.css';
import AddAsContactModal from '../AddAsContactModal/AddAsContactModal';

let socket;

const Chat = (props) => {
	const {
		userMsg,
		setUserMsg,
		chatMessages,
		setChatMessages,
		checkIfContact,
		isContact,
		getContactInfo,
		verifiedUser,
		foundContact,
		loadUsersContacts,
		getLoggedInUser,
	} = useContext(GeneralContext);

	const chatId = props.match.params.id;
	const myId = verifiedUser.id;

	// This useEffect() handles the general joining and disconnection of a user to and from a room
	useEffect(() => {
		getLoggedInUser();
		getContactInfo(chatId);
		loadUsersContacts();
		checkIfContact(chatId);

		socket = io(server.ENDPOINT);
		// console.log(chatId);

		socket.emit('joinUsers', { user: myId }, ({ error }) => {
			alert(error);
		});

		return () => {
			socket.emit('end');

			socket.off();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatId]);

	/* This useEffect() listens to message for the client*/
	useEffect(() => {
		socket.on('message', (message) => {
			// console.log(message);

			setChatMessages([...chatMessages, message]);
		});

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatMessages]);

	const sendUserMessage = (e) => {
		e.preventDefault();

		if (userMsg) {
			socket.emit('clientMessage', {
				userMsg: userMsg,
				sender: verifiedUser.userName,
				senderRoom: myId,
				toContact: chatId,
			});
		}

		setUserMsg('');
	};

	// console.log(userMsg, chatMessages);

	return (
		<div>
			<div className='wrapper'>
				<div className='container-fluid  chatContainer mt-lg-5 p-0'>
					<div className='align-self-start w-100 infoContainer p-2'>
						<InfoBar />
					</div>

					{!isContact ? <AddAsContactModal chatId={chatId} /> : <div> </div>}

					<div className='chatBox w-100'>
						<div>
							<Link to='/chat-list' className=' w-100'>
								<i className='fas fa-arrow-left p-2'> Back to Chats</i>
							</Link>

							<MessagesArea className='MessageArea' />
						</div>
					</div>
					<div className='align-self-end w-100 m-0 p-0'>
						<Input sendUserMessage={sendUserMessage} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
