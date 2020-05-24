import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { GeneralContext } from '../../contexts/GeneralContext';
import { server } from '../../config/config';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './chat.css';

let socket;

const Chat = () => {
	const {
		name,
		room,
		userMsg,
		setUserMsg,
		chatMessages,
		setChatMessages,
	} = useContext(GeneralContext);

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
	}, [name, room]);

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

	console.log(userMsg, chatMessages);

	return (
		<div>
			<div className='wrapper'>
				<div className='container  chatContainer mt-5 p-0'>
					<div className='align-self-start w-100 infoContainer p-2'>
						<InfoBar />
					</div>

					<div className='chatBox w-100 p-2'>
						<h5 className='text-center'> All chats here </h5>
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
