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
import { addClassTime } from '../../lib/writeTodb';


export default function EditClassTimeModal({ timeObject, isOpen, onClose, name }) {

    const [ startTime, setStartTime ] = useState(timeObject.time.substring(0, 5));
    const [ endTime, setEndTime ] = useState(timeObject.time.substring(6, 11));
    const [ classDay, setClassDay ] = useState(timeObject.day);
    const [ classType, setClassType ] = useState(timeObject.type);
    const [ classroom, setClassroom ] = useState(timeObject.classroom);
    const { auth } = useAuth();

    /*console.log('start', startTime);
    console.log('end', endTime);
    console.log('total', timeObject.time);*/

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

        //filter by object id, edit

        const classTimeObject = {
            id: timeObject.id,
            time: startTime + '-' + endTime,
            day: classDay,
            type: classType,
            classroom: classroom
        }

        //addClassTime(auth.uid, auth.classes, classTimeObject, name);
        resetVariables();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Class Time</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isRequired>
                    <FormLabel>Start time</FormLabel>
                    <Input placeholder="Starting time" value={startTime} type="time" onChange={(e) => setStartTime(e.target.value)}/>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel mt={5}>End time</FormLabel>
                    <Input placeholder="Ending time" value={endTime} type="time" onChange={(e) => setEndTime(e.target.value)}/>
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
