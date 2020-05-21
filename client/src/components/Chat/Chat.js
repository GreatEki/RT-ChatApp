import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { GeneralContext } from '../../contexts/GeneralContext';
import { server } from '../../config/config';

let socket;

const Chat = () => {
	const { name, room } = useContext(GeneralContext);
	const [userMsg, setUserMsg] = useState('');
	const [chatMessages, setChatMessages] = useState([]);

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

	/* This useEffect() handles receiving for the client*/
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
				<div className='container mt-5'>
					<div>
						<input
							type='text'
							className='form-control'
							value={userMsg}
							onChange={(e) => setUserMsg(e.target.value)}
							onKeyPress={(e) =>
								e.key === 'Enter' ? sendUserMessage(e) : null
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
