import React from 'react';
import { Link } from 'react-router-dom';

import './grouplist.css';
const GroupList = () => {
	return (
		<div className='container p-1'>
			<div>
				<div className='d-flex flex-row'>
					<i className='fas fa-search p-3 '> </i>
					<input
						type='text'
						className='listSearch'
						placeholder='Search Group Here'
					/>
				</div>
				<ul className='contactListBox'>
					<Link className='contactListLink'>
						<li> Padi4Jungle</li>
					</Link>
					<Link className='contactListLink'>
						<li> World Leaders Forum</li>
					</Link>
					<Link className='contactListLink'>
						<li> Soccerr Group</li>
					</Link>
					<Link className='contactListLink'>
						<li> Electricity Chat</li>
					</Link>
					<Link className='contactListLink'>
						<li> Political Forum</li>
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default GroupList;
