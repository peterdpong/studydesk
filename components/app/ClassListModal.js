import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";

export default function ClassListModal({ isOpen, onClose }) {

    const [ name, setName ] = useState('');

    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(name.length === 0){
            alert("Please enter a name");
            return;
        }

        const classObject = {
            name: name,
            times: [],
            assignments: []
        }

        console.log('New Class: ', classObject.name);

        setName('');
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Class</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl id="assignment-name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Class name" onChange={nameHandler}/>
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={submitHandler}>
                Submit
                </Button>
                <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
