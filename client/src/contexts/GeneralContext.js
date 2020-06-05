import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { server } from '../config/config';
import Axios from 'axios';

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
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

	const { ENDPOINT } = server;
	let history = useHistory();

	const handleInput = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

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

				setVerifiedUser({
					id: res.data.user._id,
					firstName: res.data.user.firstname,
					lastName: res.data.user.lastName,
					email: res.data.user.email,
					token: res.data.token,
				});

				history.push('/chat-list');
			}
		} catch (err) {
			console.log(err.response);
			const errResp = err.response.data;

			setAuthMsgs(errResp.message);
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
				handleInput,
				signIn,
				setUserMsg,
				setChatMessages,
				verifiedUser,
				setRoom,
			}}>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralContextProvider;
