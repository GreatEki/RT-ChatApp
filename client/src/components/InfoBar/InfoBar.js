import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GeneralContext } from '../../contexts/GeneralContext';

const InfoBar = () => {
	const { name } = useContext(GeneralContext);
	return (
		<div>
			<div className='d-flex flex-row justify-content-between '>
				<section className='accountName p-2'>
					<i className='fas fa-user text-white p-2'></i>
					<div className='d-inline onlineIcon text-white'> {name} </div>
				</section>

				<section className='p-2'>
					<h5 className='logo text-white'> RT-CHAT</h5>
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
