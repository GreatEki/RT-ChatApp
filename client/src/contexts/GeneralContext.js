import React, { useState, createContext } from 'react';

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	return (
		<GeneralContext.Provider value={{ name, room, setName, setRoom }}>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralContextProvider;
