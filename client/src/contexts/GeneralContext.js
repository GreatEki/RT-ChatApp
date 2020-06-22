import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { server } from '../config/config';
import Axios from 'axios';

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
	const [newUser, setNewUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		userName: '',
		password: '',
	});
	const [user, setUser] = useState({
		userName: '',
		password: '',
	});
	const [room, setRoom] = useState('');

	const [verifiedUser, setVerifiedUser] = useState({});

	const [userMsg, setUserMsg] = useState('');
	const [chatMessages, setChatMessages] = useState([]);

	const [errMsgs, setErrMsgs] = useState([]);
	const [allowFormSubmission, setAllowFormSubmission] = useState(false);
	const [authMsgs, setAuthMsgs] = useState('');

	const [userContacts, setUserContacts] = useState([]);
	const [isContact, setIsContact] = useState(false);
	const [modal, setModal] = useState(false);
	const [foundContact, setFoundContact] = useState({
		id: '',
		firstname: '',
		lastname: '',
		username: '',
	});

	const { ENDPOINT } = server;
	let history = useHistory();

	//This useEffect()  saves the logged in user to our Session Storage
	useEffect(() => {
		sessionStorage.setItem('loggedUser', JSON.stringify(verifiedUser));

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verifiedUser]);

	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(userContacts));

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userContacts]);

	// handles the Login Input fields in Join Component
	const handleInput = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	// validates our Login Fields in Join Component
	const validateInput = (user) => {
		const { userName, password } = user;
		let error = {};
		if (!userName || userName.length === '') {
			error.userName = 'Please enter your username or email';
		}

		if (!password || password.length === '') {
			error.password = 'Password is required';
		}

		return error;
	};

	// Handles the front end Login functionality in Join Component
	const signIn = async (e, user) => {
		e.preventDefault();

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		try {
			let errors = validateInput(user);

			// Pulling out values from "errors"
			errors = Object.values(errors);

			if (errors.length > 0) {
				setAllowFormSubmission(false);
				setErrMsgs(errors);
				return errMsgs;
			} else {
				setAllowFormSubmission(true);
				const res = await Axios.post(
					`${ENDPOINT}/api/auth/login`,
					user,
					config
				);

				const userInfo = res.data.user;
				// console.log(userInfo._id);

				setVerifiedUser({
					id: userInfo._id,
					firstName: userInfo.firstname,
					lastName: userInfo.lastName,
					email: userInfo.email,
					token: res.data.token,
				});

				setUserContacts(userInfo.contacts);

				history.push('/chat-list');
			}
		} catch (err) {
			// console.log(err.response);
			const errResp = err.response.data;

			setAuthMsgs(errResp.message);
		}
	};

	//Methods gets the Logged In User and sets that user at the verifiedUser.
	const getLoggedInUser = () => {
		const sessionUser = sessionStorage.getItem('loggedUser');
		setVerifiedUser(JSON.parse(sessionUser));
	};

	//Method retrieves/loads the users contacts from localStorage
	const loadUserContacts = () => {
		const localContacts = localStorage.getItem('contacts');
		setUserContacts(JSON.parse(localContacts));
	};

	// Signs out the user from CHAT.
	const signOutUser = () => {
		sessionStorage.setItem('logggedUser', JSON.stringify({}));
		history.push('/join');

		window.location.reload(true);
	};

	//This methods checks if a chat user is a contact of the verifiedUser
	const checkIfContact = (id) => {
		try {
			if (userContacts.length > 0) {
				userContacts.map((contact) => {
					if (id === contact.id) {
						setIsContact(true);
						setModal(false);
						// console.log(id);
					} else {
						setIsContact(false);
						setModal(true);
					}
				});
			} else if (userContacts.length <= 0) {
				setIsContact(false);
				setModal(true);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	// This method fetches the searched contacts details and saved it in the foundContact state variable
	const getContactInfo = async (id) => {
		try {
			const res = await Axios.get(`${ENDPOINT}/api/users/${id}`);

			const { _id, firstName, lastName, userName } = res.data.user;

			const contact = {
				id: _id,
				firstname: firstName,
				lastname: lastName,
				username: userName,
			};

			setFoundContact(contact);

			return foundContact;
		} catch (err) {
			console.log(err.message);
		}
	};

	//Method adds a new contact to the contact array of the user
	const addNewContact = async (e, userId, contact) => {
		e.preventDefault();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await Axios.post(
			`${ENDPOINT}/api/users/contacts/${userId}`,
			contact,
			config
		);

		setModal(!modal);
	};

	const handleSignUpUserInput = (e) => {
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	};

	const signUpUser = async (e, newUser) => {
		e.preventDefault();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await Axios.post(
				`${ENDPOINT}/api/auth/create-account`,
				newUser,
				config
			);

			setAuthMsgs(res.data.message);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<GeneralContext.Provider
			value={{
				room,
				userMsg,
				chatMessages,
				user,
				errMsgs,
				authMsgs,
				allowFormSubmission,
				userContacts,
				handleInput,
				signIn,
				setUserMsg,
				setChatMessages,
				verifiedUser,
				setRoom,
				getLoggedInUser,
				signOutUser,
				checkIfContact,
				isContact,
				modal,
				setModal,
				getContactInfo,
				foundContact,
				addNewContact,
				loadUserContacts,
				handleSignUpUserInput,
				newUser,
				signUpUser,
				authMsgs,
			}}>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralContextProvider;
