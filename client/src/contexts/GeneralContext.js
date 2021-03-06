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

	const [verifiedUser, setVerifiedUser] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);

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
		sessionStorage.setItem('isAuth', isAuthenticated);

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verifiedUser, isAuthenticated]);

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
					firstName: userInfo.firstName,
					lastName: userInfo.lastName,
					userName: userInfo.userName,
					email: userInfo.email,
					token: res.data.token,
				});

				setUserContacts(userInfo.contacts);

				setIsAuthenticated(true);

				history.push('/chat-list');
			}
		} catch (err) {
			console.log(err.message);

			// if (err.message === 'Network Error') {
			// 	setAuthMsgs(err.message);
			// } else {
			// 	const errResp = err.response.data;
			// 	setAuthMsgs(errResp.message);
			// }
		}
	};

	//Methods gets the Logged In User and sets that user at the verifiedUser.
	const getLoggedInUser = () => {
		const sessionUser = sessionStorage.getItem('loggedUser');
		setVerifiedUser(JSON.parse(sessionUser));

		const sessionAuth = sessionStorage.getItem('isAuth');
		setIsAuthenticated(JSON.parse(sessionAuth));
		return isAuthenticated;
	};

	//Method retrieves/loads the users contacts from localStorage
	const loadUsersContacts = async () => {
		const localContacts = localStorage.getItem('contacts');
		setUserContacts(JSON.parse(localContacts));
	};

	// Signs out the user from CHAT.
	const signOutUser = () => {
		sessionStorage.setItem('logggedUser', JSON.stringify({}));
		sessionStorage.setItem('isAuth', JSON.stringify(setIsAuthenticated(false)));
		history.push('/join');

		window.location.reload(true);
	};

	//This methods checks if a chat user is a contact of the verifiedUser
	const checkIfContact = (id) => {
		try {
			// loadUserContacts();
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
					return modal;
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

		await Axios.post(
			`${ENDPOINT}/api/users/contacts/${userId}`,
			contact,
			config
		);

		setModal(!modal);
	};

	// Method handles the sign up user input fields in our Register Component
	const handleSignUpUserInput = (e) => {
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	};

	// Handles the Sign Up functionality in Register Component
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

			setTimeout(() => {
				setNewUser({
					firstName: '',
					lastName: '',
					email: '',
					userName: '',
					password: '',
				});

				setAuthMsgs('');
			}, 3000);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<GeneralContext.Provider
			value={{
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
				getLoggedInUser,
				signOutUser,
				checkIfContact,
				isContact,
				modal,
				setModal,
				getContactInfo,
				foundContact,
				addNewContact,
				loadUsersContacts,
				handleSignUpUserInput,
				newUser,
				signUpUser,
				isAuthenticated,
			}}>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralContextProvider;
