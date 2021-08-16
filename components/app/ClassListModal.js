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
import { useAuth } from '../../lib/auth';
import firebase from '../../lib/firebase';

export default function ClassListModal({ isOpen, onClose }) {

    const [ name, setName ] = useState('');
    const { auth } = useAuth();

    const refToUserData = firebase.firestore().collection("users").doc(auth.uid);

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
            times: [
                {
                    id: 1,
                    time: "9:00-10:00",
                    day: "Mon",
                    type: "Lecture"
                }
            ],
            assignments: [
                {
                    name: "Example Assignment",
                    dueDate: "2021-09-08",
                    weight: 5
                }
            ]
        }

        const updatedClasses = auth.classes.concat(classObject);

        refToUserData
            .update({
                classes: updatedClasses
            })
            .catch(
                (err) => console.log(err)
            )

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
