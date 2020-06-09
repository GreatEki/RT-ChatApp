import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '../InfoBar/InfoBar';
import { GeneralContext } from '../../contexts/GeneralContext';
import { ContactsContext } from '../../contexts/ContactsContext';

import './grouplist.css';

const GroupList = () => {
	const { verifiedUser, userContacts } = useContext(GeneralContext);
	const {
		addNewContact,
		setSearchVal,
		searchVal,
		searchForContacts,
		gotoSearch,
	} = useContext(ContactsContext);

	const { id } = verifiedUser;
	console.log(id);

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

				{userContacts.map((contact, index) => {
					return (
						<ul className='contactListBox' key={index}>
							<Link to={`/chat/${contact.id}`} className='contactListLink'>
								<li> {contact.username}</li>
							</Link>
						</ul>
					);
				})}
			</div>
		</div>
	);
};

export default GroupList;
