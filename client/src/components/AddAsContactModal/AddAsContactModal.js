import React, { useContext } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GeneralContext } from '../../contexts/GeneralContext';

const AddAsContactModal = (props) => {
	const { modal, setModal, foundContact } = useContext(GeneralContext);

	const toggle = () => {
		setModal(!modal);
	};

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Add To Contact</ModalHeader>
				<ModalBody>
					Hi Ekene, {foundContact.userName} is not on your contact list. Would
					you like to add {foundContact.userName} now?
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={toggle}>
						Add to Lost
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
