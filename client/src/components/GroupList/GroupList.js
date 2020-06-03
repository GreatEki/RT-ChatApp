import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StyleContext } from '../../contexts/StyleContext';
import InfoBar from '../InfoBar/InfoBar';

import './grouplist.css';

const GroupList = () => {
	const { selectChat } = useContext(StyleContext);
	return (
		<div className='container p-1'>
			<div>
				<InfoBar />
				<div className='d-flex flex-row'>
					<i className='fas fa-search p-3 '> </i>
					<input
						type='text'
						className='listSearch'
						placeholder='Search Group Here'
					/>
				</div>
				<ul className='contactListBox'>
					<Link to='/chat' className='contactListLink'>
						<li> Padi4Jungle</li>
					</Link>
					<Link to='/chat' className='contactListLink'>
						<li> World Leaders Forum</li>
					</Link>
					<Link to='/chat' className='contactListLink'>
						<li> Soccerr Group</li>
					</Link>
					<Link to='/chat' className='contactListLink'>
						<li> Electricity Chat</li>
					</Link>
					<Link to='/chat' className='contactListLink'>
						<li> Political Forum</li>
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default GroupList;
