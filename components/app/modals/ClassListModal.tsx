import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
import { addClass } from '../../../lib/writeTodb';
import { Class } from '../../../lib/models/Class';
import { ClassTypes } from '../../../lib/models/ClassTimes';

export default function ClassListModal(props: { isOpen: boolean, onClose: () => void, uid: string, classes: Class[] }) {

    const [ name, setName ] = useState('');

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if(name.length === 0){
            alert("Please enter a name");
            return;
        }

        const checkOverlap = props.classes.filter((c: Class) => c.name === name);

        if(checkOverlap[0]){
            alert("This class already exists!");
            return;
        }

        const classObject: Class = {
            name: name,
            classTimes: [],
            teacherName: '',
            color: '',
            syllabus: "",
            times: [
                {
                    id: Math.random(),
                    startTime: "09:00",
                    endTime: "10:00",
                    day: "Mon",
                    type: ClassTypes.Lecture,
                    classroom: "MH100",
                    className: name
                }
            ],
            assignments: [
                {
                    id: Math.random(),
                    name: "Example Assignment",
                    dueDate: "2021-09-08",
                    weight: 5,
                    grade: 80
                }
            ]
        }

        const updatedClasses = props.classes.concat(classObject);
        addClass(props.uid, updatedClasses);
        setName('');
        props.onClose();
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
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
                <Button colorScheme="blue" variant="outline" mr={3} onClick={props.onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
