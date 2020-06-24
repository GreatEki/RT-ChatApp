import React, { useContext } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GeneralContext } from '../../contexts/GeneralContext';

const AddAsContactModal = (props) => {
	const {
		modal,
		setModal,
		foundContact,
		verifiedUser,
		addNewContact,
	} = useContext(GeneralContext);

	const toggle = () => {
		setModal(!modal);
	};

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Add To Contact</ModalHeader>
				<ModalBody>
					Hi {verifiedUser.firstName}, This User is not on your contact list.
					Would you like to add {foundContact.username} now?
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={(e) => addNewContact(e, verifiedUser.id, foundContact)}>
						Add to List
					</Button>{' '}
					<Button color='secondary' onClick={toggle}>
						Not Now
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddAsContactModal;
