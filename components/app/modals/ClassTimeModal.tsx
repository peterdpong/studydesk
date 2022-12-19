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
import { addClassTime } from '../../../lib/db-actions/ClassActions';
import { ClassModel } from '../../../lib/models/ClassModel';
import { ClassTimes, ClassTypes } from '../../../lib/models/ClassTimes';
  

export default function ClassTimeModal(props: { isOpen: boolean, onClose: () => void, name: string | undefined, uid: string | undefined, classes: ClassModel[] | undefined }) {
    const [ startTime, setStartTime ] = useState('');
    const [ endTime, setEndTime ] = useState('') ;
    const [ classDay, setClassDay ] = useState('');
    const [ classType, setClassType ] = useState('');
    const [ classRoom, setClassRoom ] = useState('');

    const resetVariables = () => {
        setStartTime('');
        setEndTime('');
        setClassDay('');
        setClassType('');
        setClassRoom('');
    }

    const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
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

        if(classRoom.length === 0){
            alert('Please enter a classroom');
            return;
        }

        // TODO: Check undefined
        const newClassTime: ClassTimes = {
            className: props.name ? props.name : "",
            startTime: startTime,
            endTime: endTime,
            day: classDay,
            type: ClassTypes.Lecture,
            classRoom: classRoom
        }

        // TODO: Check undefined
        addClassTime(props.uid, props.classes!, newClassTime, props.name!);
        resetVariables();
        props.onClose();
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
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
                    <Input placeholder="Classroom" value={classRoom} onChange={(e) => setClassRoom(e.target.value)}/>
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={submitHandler}>
                    Submit
                </Button>
                <Button colorScheme="blue" variant="outline" mr={3} onClick={props.onClose}>
                    Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
