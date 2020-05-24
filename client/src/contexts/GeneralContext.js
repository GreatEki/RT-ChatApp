import React, { useState, createContext } from 'react';

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	const [userMsg, setUserMsg] = useState('');
	const [chatMessages, setChatMessages] = useState([]);
	return (
		<GeneralContext.Provider
			value={{
				name,
				room,
				userMsg,
				chatMessages,
				setUserMsg,
				setChatMessages,
				setName,
				setRoom,
			}}>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralContextProvider;
