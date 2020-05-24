import React, { useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import './input.css';

const Input = ({ sendUserMessage }) => {
	const { userMsg, setUserMsg } = useContext(GeneralContext);
	return (
		<div>
			<form>
				<input
					type='text'
					className='d-inline chatInput'
					value={userMsg}
					onChange={(e) => setUserMsg(e.target.value)}
					onKeyPress={(e) => (e.key === 'Enter' ? sendUserMessage(e) : null)}
				/>

				<button className='sendBtn d-inline'>
					{' '}
					<i className='fas fa-paper-plane'></i> Send{' '}
				</button>
			</form>
		</div>
	);
};

export default Input;
