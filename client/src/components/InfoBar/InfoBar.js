import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GeneralContext } from '../../contexts/GeneralContext';

const InfoBar = () => {
	const { name, signOutUser } = useContext(GeneralContext);
	return (
		<div className='infoContainer'>
			<div className='d-flex flex-row justify-content-between '>
				<section className='accountName p-2'>
					<i className='fas fa-user text-white p-2'></i>
					<div className='d-inline onlineIcon text-white'> {name} </div>
				</section>

				<section className='p-2'>
					<h5 className='logo text-white'> RT-CHAT</h5>
				</section>
				<section className='closeBtn p-2 '>
					<div className='bg-danger p-2' onClick={() => signOutUser()}>
						{' '}
						<span className='text-white'> &times; </span>
					</div>
				</section>
			</div>
		</div>
	);
};

export default InfoBar;
