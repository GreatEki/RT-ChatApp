import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './join.css';
import { GeneralContext } from '../../contexts/GeneralContext';
import { sign } from 'jsonwebtoken';

const Join = () => {
	const { name, user, handleInput, signIn, errMsgs, authMsgs } = useContext(
		GeneralContext
	);

	return (
		<div className='wrapper'>
			<div className='h-center v-center joinWrapper'>
				{errMsgs.length > 0 ? (
					errMsgs.map((msg) => (
						<p className='text-danger text-center'> {msg} </p>
					))
				) : (
					<small className='text-danger text-success'> {authMsgs} </small>
				)}
				<h1 className='text-center'> JOIN RT_CHAT </h1>

				<p className='text-center'>
					{' '}
					Its easy and Free, Signup with your username and password and start
					chatting
				</p>

				<div className='text-center p-2 '>
					<input
						type='text'
						name='username'
						className='inputText w-100  rounded-0'
						placeholder='Enter Username here'
						onChange={(e) => handleInput(e)}
						value={user.username}
					/>
				</div>

				{/* <div className='text-center p-2'>
					<input
						type='password'
						name='password'
						className='inputText w-100 rounded-pill form-control'
						placeholder='Your Password Here'
						onChange={(e) => setRoom(e.target.value)}
						value={room}
					/>
				</div> */}

				{/* <div className='text-center p-2'>
					<select
						className='w-100 p-2 '
						onChange={(e) => setRoom(e.target.value)}
						value={room}>
						<option> Select A Chat Room</option>
						<option value='JS'> JS </option>
						<option value='React'> React </option>
						<option value='Python'> Python</option>
						<option value='Java'> Java</option>
						<option value='Dev-Ops'> Dev-Ops</option>
					</select>
				</div>
 */}
				<div className='text-center p-2 '>
					<input
						type='password'
						name='password'
						className='inputText w-100  rounded-0'
						placeholder='Password'
						onChange={(e) => handleInput(e)}
						value={user.password}
					/>
				</div>

				<button
					onClick={(e) => signIn(e, user)}
					className='h-center btn-block siteBtn w-25 p-1'>
					{' '}
					Enter{' '}
				</button>
			</div>
		</div>
	);
};

export default Join;
