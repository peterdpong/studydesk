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
  

export default function ClassTimeModal({ isOpen, onClose, name }) {

    const [ classTime, setClassTime ] = useState('');
    const [ classDay, setClassDay ] = useState('');
    const [ classType, setClassType ] = useState('');
    const { auth } = useAuth();

    const refToUserData = firebase.firestore().collection("users").doc(auth.uid);

    const submitHandler = (e) => {
        e.preventDefault();

        if(classTime.length === 0){
            alert('Please enter a time');
            return;
        }

        if(classDay.length === 0){
            alert('Please enter a day');
            return;
        }

        if(classType.length === 0){
            alert('Please enter a type');
            return;
        }

        const classTimeObject = {
            time: classTime,
            day: classDay,
            type: classType
        }

        //add to assignment list

        const previousClasses = auth.classes.filter((c) => c.name !== name);
        const updatedClass = auth.classes.filter((c) => c.name === name)[0];
        const previousTimes = updatedClass.times;
        const updatedTimes = previousTimes.concat(classTimeObject);
        updatedClass.times = updatedTimes;
        previousClasses.push(updatedClass);
        console.log(previousClasses);

        refToUserData
            .update({
                classes: previousClasses
            })
            .catch(
                (err) => console.log(err)
            )

        setClassTime('');
        setClassDay('');
        setClassType('');
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Class Time</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl id="class-time" isRequired>
                    <FormLabel>Time</FormLabel>
                    <Input placeholder="Class time" onChange={(e) => setClassTime(e.target.value)}/>
                </FormControl>

                <FormControl id="class-day" isRequired>
                    <FormLabel mt={5}>Day</FormLabel>
                    <Input placeholder="Class day" onChange={(e) => setClassDay(e.target.value)}/>
                </FormControl>
                    
                <FormControl id="class-type" isRequired>
                    <FormLabel mt={5}>Type (Lecture, Tutorial, Practical)</FormLabel>
                    <Input placeholder="Class type" onChange={(e) => setClassType(e.target.value)}/>
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
