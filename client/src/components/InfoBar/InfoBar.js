import React from 'react';
import { Link } from 'react-router-dom';

const InfoBar = () => {
	return (
		<div>
			<div className='d-flex flex-row justify-content-between '>
				<section className='accountName p-2'>
					<i className='fas fa-user text-white p-2'></i>
					<div className='d-inline onlineIcon'> GreatEki </div>
				</section>

				<section className='p-2'>
					<h5 className='text-white'> RT-CHAT</h5>
				</section>
				<section className='closeBtn p-2'>
					<Link to='/join' className='text-white'>
						{' '}
						&times;
					</Link>
				</section>
			</div>
		</div>
	);
};

export default InfoBar;
