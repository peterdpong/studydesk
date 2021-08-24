import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
import { addClass } from '../../../lib/writeTodb';

export default function PasswordModal({ isOpen, onClose, uid }) {

    const [ newPassword, setNewPassword ] = useState('');

    const passwordHandler = (e) => {
        setNewPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(newPassword);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Change Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl id="assignment-name" isRequired>
                    <FormLabel>New Password</FormLabel>
                    <Input placeholder="New Password" onChange={passwordHandler}/>
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={submitHandler}>
                Update
                </Button>
                <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
