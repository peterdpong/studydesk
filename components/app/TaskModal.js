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

export default function TaskModal({ isOpen, onClose }) {

    const [ name, setName ] = useState('');
    const [ date, setDate ] = useState('');

    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const dateHandler = (e) => {
        setDate(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(name.length === 0){
            alert("Please enter a name");
            return;
        }

        const taskObject = {
            name: name,
            dueDate: date
        }

        if(date.length === 0){
            taskObject.dueDate = "N/A";
        }

        //add object to task list

        //console.log(taskObject.name, taskObject.dueDate);

        setName('');
        setDate('');
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl id="assignment-name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Assignment name" onChange={nameHandler}/>
                </FormControl>

                <FormControl id="assignment-date">
                    <FormLabel mt={5}>Due Date</FormLabel>
                    <Input placeholder="Due Date" type="date" onChange={dateHandler}/>
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
