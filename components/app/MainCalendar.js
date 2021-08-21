import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    Box, 
    Heading,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from "@chakra-ui/react";
import { findCalendarMatch } from '../../lib/writeTodb';

export default function MainCalendar({ uid, tasks, classes }) {
    const [ value, setValue ] = useState(new Date());
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ date, setDate ] = useState('');
    const [ day, setDay ] = useState('');
    const [ assignmentList, setAssignmentList ] = useState([]);
    const [ taskList, setTaskList ] = useState([]);
    const [ classList, setClassList ] = useState([]);

    const onChange = (nextValue) => {
        setValue(nextValue);
        const dateString = nextValue
            .toISOString()
            .substring(0, 10)

        const dayString = nextValue
            .toString()
            .substring(0, 3)

        setDate(dateString.substring(5, 10).replace('-', '/'));
        setDay(dayString);

        const { assignmentArray, taskArray, classArray } = findCalendarMatch(tasks, classes, dateString, dayString);
        setAssignmentList(assignmentArray);
        setTaskList(taskArray);
        setClassList(classArray);
        onOpen();
    }


    return (
        <Box mt={5}>
            <Heading mb={2}>Calendar</Heading>
            <Box align="center" mt={5}>
                <Calendar
                    onChange={onChange}
                    value={value}
                />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{date} {day}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize='xl'>Classes: </Text>
                    {classList.length === 0 ? 
                    <Text>No classes on this day!</Text>
                        :
                    <Box>
                        {classList.map((c) => {
                            return(
                                <Box key={c.id}>
                                    <Text>{c.startTime}-{c.endTime} - {c.className} ({c.type}) at {c.classroom}</Text>
                                </Box>
                            )
                            
                        })}
                    </Box>
                    }

                    <Text fontSize='xl' mt={5}>Assignments: </Text>
                    {assignmentList.length === 0 ? 
                    <Text>No assignments due on this day!</Text>
                    :   
                    <Box>
                        {assignmentList.map((a) => {
                            return(
                                <Box key={a.id}>
                                    <Text>· {a.name} - {a.weight}%</Text>
                                </Box>
                            )
                        })}
                    </Box>
                    }
                    
                    <Text fontSize='xl' mt={5}>Tasks: </Text>
                    {taskList.length === 0 ? 
                    <Text>No tasks due on this day!</Text>
                    :   
                    <Box>
                        {taskList.map((t) => {
                            return(
                                <Box key={t.id}>
                                    <Text>· {t.name}</Text>
                                </Box>
                            )
                        })}
                    </Box>
                    }
                    
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        
    )
}
