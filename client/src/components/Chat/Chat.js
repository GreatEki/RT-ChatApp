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
		name,
		room,
		userMsg,
		setUserMsg,
		chatMessages,
		setChatMessages,
		checkIfContact,
		isContact,
		getContactInfo,
	} = useContext(GeneralContext);

	const chatId = props.match.params.id;

	useEffect(() => {
		checkIfContact(chatId);
		getContactInfo(chatId);

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isContact]);

	//This useEffect() handles the general joining and disconnection of a user to and from a room
	useEffect(() => {
		socket = io(server.ENDPOINT);

		//this handles allowing a user to join a chat room
		socket.emit('join', { name, room }, () => {});

		/* providing a return statement inside the useEffect() which
            we use for unmouting or disconnecting the user */
		return () => {
			socket.emit('disconnect');

			socket.off();
		};
	}, []);

	/* This useEffect() listens to message for the client*/
	useEffect(() => {
		socket.on('message', (message) => {
			setChatMessages([...chatMessages, message]);
		});

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatMessages]);

	const sendUserMessage = (e) => {
		e.preventDefault();

		if (userMsg) {
			socket.emit('clientMessage', userMsg, () => setUserMsg(''));
		}
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
