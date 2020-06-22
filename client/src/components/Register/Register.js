import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import { GeneralContext } from '../../contexts/GeneralContext';

const Register = () => {
	const { handleSignUpUserInput, newUser, signUpUser, authMsgs } = useContext(
		GeneralContext
	);
	return (
		<div className='container wrapper'>
			<div className='registerBox v-center'>
				<h5 className='logo text-center'>RT-CHAT</h5>
				<div className='card h-center registerForm'>
					<p className='text-center font-weight-bold'> Create Free Account. </p>

					{authMsgs ? (
						<p className='text-center text-success'> {authMsgs} </p>
					) : (
						<p> </p>
					)}

					<form onSubmit={(e) => signUpUser(e, newUser)}>
						<div className='text-center '>
							<input
								type='text'
								name='firstName'
								onChange={(e) => handleSignUpUserInput(e)}
								value={newUser.firstName}
								className='registerInput  rounded-0'
								placeholder='Firstname'
								required
							/>
						</div>
						<div className='text-center '>
							<input
								type='text'
								name='lastName'
								onChange={(e) => handleSignUpUserInput(e)}
								value={newUser.lastName}
								className='registerInput  rounded-0'
								placeholder='Lastname'
								required
							/>
						</div>
						<div className='text-center '>
							<input
								type='email'
								name='email'
								onChange={(e) => handleSignUpUserInput(e)}
								value={newUser.email}
								className='registerInput  rounded-0'
								placeholder='Email'
								required
							/>
						</div>
						<div className='text-center '>
							<input
								type='text'
								name='userName'
								onChange={(e) => handleSignUpUserInput(e)}
								value={newUser.userName}
								className='registerInput  rounded-0'
								placeholder='Preferred Username'
								required
							/>
						</div>
						<div className='text-center '>
							<input
								type='password'
								name='password'
								onChange={(e) => handleSignUpUserInput(e)}
								value={newUser.password}
								className='registerInput  rounded-0'
								placeholder='Password'
								required
							/>
						</div>

						<button className='h-center btn-block siteBtn w-50 p-1'>
							{' '}
							Create Account
						</button>

						<div className='text-center p-2'>
							<small className='p-2'>
								Already Have An Account?
								<Link to='/join'> Sign In </Link>
								Here.
							</small>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
