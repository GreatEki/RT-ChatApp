import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '../InfoBar/InfoBar';
import { GeneralContext } from '../../contexts/GeneralContext';
import { ContactsContext } from '../../contexts/ContactsContext';

import './grouplist.css';

const GroupList = () => {
	const { userContacts, getLoggedInUser, loadUserContacts } = useContext(
		GeneralContext
	);
	const { setSearchVal, searchVal, gotoSearch } = useContext(ContactsContext);

	useEffect(() => {
		getLoggedInUser();
		loadUserContacts();

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='container p-1'>
			<div>
				<InfoBar />
				<div className='d-flex flex-row'>
					<i className='fas fa-search p-3 '> </i>
					<input
						type='text'
						onChange={(e) => setSearchVal(e.target.value)}
						value={searchVal}
						onKeyPress={(e) =>
							e.key === 'Enter' ? gotoSearch(e, searchVal) : null
						}
						className='listSearch'
						placeholder='Search for Friends and Groups Here'
					/>
				</div>

				<ul className='contactListBox'>
					{userContacts.map((contact, index) => {
						return (
							<Link
								to={`/chat/${contact.id}`}
								key={index}
								className='contactListLink'>
								<li> {contact.username}</li>
							</Link>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default GroupList;
