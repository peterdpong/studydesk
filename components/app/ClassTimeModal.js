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
    Input, 
    Select
} from "@chakra-ui/react";
import { useAuth } from '../../lib/auth';
import firebase from '../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
  

export default function ClassTimeModal({ isOpen, onClose, name }) {

    const [ startTime, setStartTime ] = useState('');
    const [ endTime, setEndTime ] = useState('');
    const [ classDay, setClassDay ] = useState('');
    const [ classType, setClassType ] = useState('');
    const [ classroom, setClassroom ] = useState('');
    const { auth } = useAuth();

    const refToUserData = firebase.firestore().collection("users").doc(auth.uid);

    const submitHandler = (e) => {
        e.preventDefault();

        if(startTime.length === 0){
            alert('Please enter a starting time');
            return;
        }

        if(endTime.length === 0){
            alert('Please enter an ending time');
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

        if(classroom.length === 0){
            alert('Please enter a classroom');
            return;
        }

        const classTimeObject = {
            id: uuidv4(),
            time: startTime + '-' + endTime,
            day: classDay,
            type: classType,
            classroom: classroom
        }

        const previousClasses = auth.classes.filter((c) => c.name !== name);
        const updatedClass = auth.classes.filter((c) => c.name === name)[0];
        const previousTimes = updatedClass.times;
        const updatedTimes = previousTimes.concat(classTimeObject);
        updatedClass.times = updatedTimes;
        previousClasses.push(updatedClass);

        refToUserData
            .update({
                classes: previousClasses
            })
            .catch(
                (err) => console.log(err)
            )

        setStartTime('');
        setEndTime('');
        setClassDay('');
        setClassType('');
        setClassroom('');
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Class Time</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl id="class-time-start" isRequired>
                    <FormLabel>Start time</FormLabel>
                    <Input placeholder="Starting time" type="time" onChange={(e) => setStartTime(e.target.value)}/>
                </FormControl>

                <FormControl id="class-time-end" isRequired>
                    <FormLabel mt={5}>End time</FormLabel>
                    <Input placeholder="Ending time" type="time" onChange={(e) => setEndTime(e.target.value)}/>
                </FormControl>

                <FormControl id="class-day" isRequired>
                    <FormLabel mt={5}>Day</FormLabel>
                    <Select placeholder="Class day" onChange={(e) => setClassDay(e.target.value)}>
                        <option>Mon</option>
                        <option>Tue</option>
                        <option>Wed</option>
                        <option>Thu</option>
                        <option>Fri</option>
                    </Select>
                </FormControl>
                    
                <FormControl id="class-type" isRequired>
                    <FormLabel mt={5}>Type (LEC, TUT, PRA)</FormLabel>
                    <Select placeholder="Class type" onChange={(e) => setClassType(e.target.value)}>
                        <option>Lecture</option>
                        <option>Tutorial</option>
                        <option>Practical</option>
                    </Select>
                </FormControl>

                <FormControl id="classroom" isRequired>
                    <FormLabel mt={5}>Classroom</FormLabel>
                    <Input placeholder="Classroom" onChange={(e) => setClassroom(e.target.value)}/>
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
