import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './join.css';
import { GeneralContext } from '../../contexts/GeneralContext';

const Join = () => {
	const { user, handleInput, signIn, errMsgs, authMsgs } = useContext(
		GeneralContext
	);

	return (
		<div className='wrapper'>
			<div className='h-center v-center joinWrapper'>
				{errMsgs.length > 0 ? (
					errMsgs.map((msg, index) => (
						<p className='text-danger text-center' key={index}>
							{' '}
							{msg}{' '}
						</p>
					))
				) : (
					<small className='text-danger text-success'> {authMsgs} </small>
				)}
				<h1 className='text-center'> JOIN RT_CHAT </h1>

				<p className='text-center'> Login to connect with your friends.</p>

				<div className='text-center p-2 '>
					<input
						type='text'
						name='userName'
						className='inputText w-100  rounded-0'
						placeholder='Enter username here'
						onChange={(e) => handleInput(e)}
						value={user.userName}
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

				<div className='text-center p-2'>
					<p className='p-2'>
						Already Have An Account?
						<Link to='/register'> Join </Link>
						Here.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Join;
