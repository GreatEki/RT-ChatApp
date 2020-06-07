import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '../InfoBar/InfoBar';
import { ContactsContext } from '../../contexts/ContactsContext';

const Search = () => {
	const {
		searchRes,
		setSearchVal,
		searchVal,
		searchForContacts,
		gotoSearch,
	} = useContext(ContactsContext);

	useEffect(() => {
		searchForContacts(searchVal);

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchVal]);
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

				{searchRes.length > 0 ? (
					searchRes.map((person, index) => (
						<ul className='contactListBox' key={index}>
							<Link to='/chat' className='contactListLink'>
								<li> {person.username} </li>
							</Link>
						</ul>
					))
				) : (
					<div className='text-center'> No resuts for {searchVal} </div>
				)}
			</div>
		</div>
	);
};

export default Search;
