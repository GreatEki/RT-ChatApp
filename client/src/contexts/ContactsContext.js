import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { server } from '../config/config';

export const ContactsContext = createContext();

const ContactsContextProvider = (props) => {
	const { ENDPOINT } = server;

	const [searchVal, setSearchVal] = useState('');
	const [searchRes, setSearchRes] = useState([]);

	let history = useHistory();

	//Method accepts value a searches for contacts
	// Method is fired in the grouplist component and whenever the value changes
	const searchForContacts = async (val) => {
		try {
			if (!val || val === '') {
				return;
			} else {
				const res = await Axios.get(`${ENDPOINT}/api/users/search/${val}`);

				const data = res.data;

				setSearchRes(data.contacts);
			}
		} catch (err) {
			console.log(err.response);
		}
	};

	//Method sends user to the search page.
	const gotoSearch = (e, val) => {
		e.preventDefault();
		history.push(`/search/contacts/${val}`);
	};

	return (
		<ContactsContext.Provider
			value={{
				searchForContacts,
				setSearchVal,
				gotoSearch,
				searchVal,
				searchRes,
			}}>
			{props.children}
		</ContactsContext.Provider>
	);
};

export default ContactsContextProvider;
