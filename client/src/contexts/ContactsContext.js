import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { server } from '../config/config';

export const ContactsContext = createContext();

const ContactsContextProvider = (props) => {
	const { ENDPOINT } = server;

	const [searchVal, setSearchVal] = useState('');
	const [searchRes, setSearchRes] = useState([]);

	let history = useHistory();

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

	const gotoSearch = (e, val) => {
		e.preventDefault();
		history.push(`/search/contacts/${val}`);
	};

	const addNewContact = async (e, userId, contact) => {
		e.preventDefault();

		const config = {
			headers: {
				'Content-Type': 'application.json',
			},
		};

		const res = await Axios.post(
			`${ENDPOINT}/api/users/${userId}`,
			contact,
			config
		);
	};
	return (
		<ContactsContext.Provider
			value={{
				addNewContact,
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
