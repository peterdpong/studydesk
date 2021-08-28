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
import { addClassTime } from '../../../lib/writeTodb';
  

export default function ClassTimeModal({ isOpen, onClose, name, uid, classes }) {
    const [ startTime, setStartTime ] = useState('');
    const [ endTime, setEndTime ] = useState('') ;
    const [ classDay, setClassDay ] = useState('');
    const [ classType, setClassType ] = useState('');
    const [ classroom, setClassroom ] = useState('');

    const resetVariables = () => {
        setStartTime('');
        setEndTime('');
        setClassDay('');
        setClassType('');
        setClassroom('');
    }

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
            id: Math.random(),
            className: name,
            startTime: startTime,
            endTime: endTime,
            day: classDay,
            type: classType,
            classroom: classroom
        }

        addClassTime(uid, classes, classTimeObject, name);
        resetVariables();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW={{base: "90%", md: "md"}}>
            <ModalHeader>Add Class Time</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isRequired>
                    <FormLabel>Start time</FormLabel>
                    <Input placeholder="Starting time" value={startTime} type="time" onChange={(e) => setStartTime(e.target.value)}/>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel mt={5}>End time</FormLabel>
                    <Input placeholder="Ending time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel mt={5}>Day</FormLabel>
                    <Select placeholder="Class day" value={classDay} onChange={(e) => setClassDay(e.target.value)}>
                        <option>Mon</option>
                        <option>Tue</option>
                        <option>Wed</option>
                        <option>Thu</option>
                        <option>Fri</option>
                    </Select>
                </FormControl>
                    
                <FormControl isRequired>
                    <FormLabel mt={5}>Type (LEC, TUT, PRA)</FormLabel>
                    <Select placeholder="Class type" value={classType} onChange={(e) => setClassType(e.target.value)}>
                        <option>Lecture</option>
                        <option>Tutorial</option>
                        <option>Practical</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel mt={5}>Classroom</FormLabel>
                    <Input placeholder="Classroom" value={classroom} onChange={(e) => setClassroom(e.target.value)}/>
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
