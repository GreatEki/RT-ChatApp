import React from 'react';

import './register.css';

const Register = () => {
	return (
		<div className='container wrapper'>
			<div className='registerBox v-center'>
				<h5 className='logo text-center'>RT-CHAT</h5>
				<div className='card h-center registerForm'>
					<p className='text-center font-weight-bold'> Create Free Account. </p>
					<form>
						<div className='text-center '>
							<input
								type='text'
								name='username'
								className='registerInput  rounded-0'
								placeholder='Firstname'
							/>
						</div>
						<div className='text-center '>
							<input
								type='text'
								name='username'
								className='registerInput  rounded-0'
								placeholder='Lastname'
							/>
						</div>
						<div className='text-center '>
							<input
								type='text'
								name='username'
								className='registerInput  rounded-0'
								placeholder='Email'
							/>
						</div>
						<div className='text-center '>
							<input
								type='text'
								name='username'
								className='registerInput  rounded-0'
								placeholder='Preferred Username'
							/>
						</div>
						<div className='text-center '>
							<input
								type='password'
								name='username'
								className='registerInput  rounded-0'
								placeholder='Password'
							/>
						</div>

						<button className='h-center btn-block siteBtn w-50 p-1'>
							{' '}
							Create Account
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
