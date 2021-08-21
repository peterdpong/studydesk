import React from 'react';
import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from "@chakra-ui/react";

export default function CalendarModal({ isOpen, onClose, classList, assignmentList, taskList, date, day }) {
    return (
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
                                <Text>· {a.name} ({a.className}) - {a.weight}%</Text>
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
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
