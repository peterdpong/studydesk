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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input
} from "@chakra-ui/react";
  

export default function AssignmentModal({ isOpen, onClose }) {

    const [ assignmentName, setAssignmentName ] = useState('');
    const [ assignmentDate, setAssignmentDate ] = useState('');
    const [ assignmentWeight, setAssignmentWeight ] = useState(0);

    const nameHandler = (e) => {
        setAssignmentName(e.target.value);
    }

    const dateHandler = (e) => {
        setAssignmentDate(e.target.value);
    }

    const weightHandler = (e) => {
        setAssignmentWeight(e);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(assignmentName.length === 0){
            alert('Please enter a name');
        }

        else{
            const assignmentObject = {
                name: assignmentName,
                dueDate: assignmentDate,
                weight: assignmentWeight
            }

            //add to assignment list

            setAssignmentName('');
            setAssignmentDate('');
            setAssignmentWeight(0);
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Assignment</ModalHeader>
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
                    
                <FormControl id="assignment-weight">
                    <FormLabel mt={5}>Weight (%)</FormLabel>
                    <NumberInput max={100} min={0} onChange={weightHandler}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
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
