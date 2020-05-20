import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { GeneralContext } from '../../contexts/GeneralContext';
import { server } from '../../config/config';

let socket;

const Chat = () => {
	const { name, room } = useContext(GeneralContext);

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

	return (
		<div>
			<div className='wrapper'>
				Chat
				<p>{name} </p>
				<p>{room} </p>
			</div>
		</div>
	);
};

export default Chat;
