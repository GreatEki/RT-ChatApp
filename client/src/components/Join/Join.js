import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css';

const Join = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<div className='wrapper'>
			<div className='h-center v-center joinWrapper'>
				<h1 className='text-center'> JOIN RT_CHAT </h1>

				<p className='text-center'>
					{' '}
					Its easy and Free, Signup with your username and password and start
					chatting
				</p>

				<div className='text-center p-2 form-group'>
					<input
						type='text'
						name='username'
						className='inputText w-100  rounded-pill form-control'
						placeholder='Enter Username here'
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</div>

				<div className='text-center p-2'>
					<input
						type='password'
						name='password'
						className='inputText w-100 rounded-pill form-control'
						placeholder='Your Password Here'
						onChange={(e) => setRoom(e.target.value)}
						value={room}
					/>
				</div>

				<div className='text-center p-2 form-group'>
					<select className='w-100 p-2 form-control'>
						<option> Select A Chat Room</option>
						<option> JS DEvs</option>
						<option> React Devs</option>
						<option> Python</option>
						<option> Java</option>
						<option> Dev-Ops</option>
					</select>
				</div>

				<Link
					to='/'
					className='text-center my-4'
					onClick={(e) => (!name || !room ? e.preventDefault() : null)}>
					<button className='h-center btn-block btn-success w-25 p-1'>
						{' '}
						Submit{' '}
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;
