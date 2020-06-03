import React, { createContext, useState, useEffect } from 'react';

export const StyleContext = createContext();

const StyleContextProvider = (props) => {
	const [styles, setStyles] = useState({
		glDisplay: '',
		msaDisplay: '',
		glWidth: '',
		msaWidth: '',
	});

	const selectChat = (e) => {
		e.preventDefault();

		setStyles({
			glWidth: '0vw',
			glDisplay: 'none',
			msaDisplay: 'visible',
			msaWidth: '100vw',
		});
	};

	const seeChatList = (e) => {
		e.preventDefault();
		setStyles({
			glWidth: '20vw',
			glDisplay: 'visible',
			msaWidth: '80vw',
			msaDisplay: 'none',
		});
	};
	return (
		<StyleContext.Provider value={{ selectChat, seeChatList, styles }}>
			{props.children}
		</StyleContext.Provider>
	);
};

export default StyleContextProvider;
