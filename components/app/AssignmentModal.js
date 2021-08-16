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
import { useAuth } from '../../lib/auth';
import firebase from '../../lib/firebase';
  

export default function AssignmentModal({ isOpen, onClose, name }) {

    const [ assignmentName, setAssignmentName ] = useState('');
    const [ assignmentDate, setAssignmentDate ] = useState('');
    const [ assignmentWeight, setAssignmentWeight ] = useState(0);
    const { auth } = useAuth();

    const refToUserData = firebase.firestore().collection("users").doc(auth.uid);

    const submitHandler = (e) => {
        e.preventDefault();

        if(assignmentName.length === 0){
            alert('Please enter a name');
            return;
        }

        const assignmentObject = {
            name: assignmentName,
            dueDate: assignmentDate,
            weight: assignmentWeight
        }

        if(assignmentDate.length === 0){
            assignmentObject.dueDate = 'N/A';
        }

        //add to assignment list

        const previousClasses = auth.classes.filter((c) => c.name !== name);
        const updatedClass = auth.classes.filter((c) => c.name === name)[0];
        const previousAssignments = updatedClass.assignments;
        const updatedAssignments = previousAssignments.concat(assignmentObject);
        updatedClass.assignments = updatedAssignments;
        previousClasses.push(updatedClass);
        console.log(previousClasses);

        refToUserData
            .update({
                classes: previousClasses
            })
            .catch(
                (err) => console.log(err)
            )

        setAssignmentName('');
        setAssignmentDate('');
        setAssignmentWeight(0);
        onClose();
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
                    <Input placeholder="Assignment name" onChange={(e) => setAssignmentName(e.target.value)}/>
                </FormControl>

                <FormControl id="assignment-date">
                    <FormLabel mt={5}>Due Date</FormLabel>
                    <Input placeholder="Due Date" type="date" onChange={(e) => setAssignmentDate(e.target.value)}/>
                </FormControl>
                    
                <FormControl id="assignment-weight">
                    <FormLabel mt={5}>Weight (%)</FormLabel>
                    <NumberInput max={100} min={0} onChange={(e) => setAssignmentWeight(e)}>
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
