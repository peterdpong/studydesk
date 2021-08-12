import React from 'react';
import { 
    Box, 
    Flex, 
    Text,
    Button, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Spacer,
    Heading
} from "@chakra-ui/react";
import AssignmentTable from "./AssignmentTable";

export default function ClassModal({ singleClass, isOpen, onClose }) {
    return (
        <Modal size="3xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalContent>
                <ModalHeader fontSize="3xl">{singleClass.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Button mb={3}>Syllabus</Button>
                    <Box>
                        <Heading fontSize={20} p={2}>Class times</Heading>
                        {singleClass.times.map((t) => {
                            return(
                                <Box key={t.id}>
                                    <Text fontSize={18} ml={5}>{t.time} {t.day} - {t.type}</Text>
                                </Box>
                            )
                        })}
                    </Box>

                    <Flex mt={5}>
                        <Box p="2">
                            <Heading size="md">Assignments</Heading>
                        </Box>
                        <Spacer/>
                        <Box mt={3}>
                            <Button colorScheme="teal">Add</Button>
                        </Box>
                    </Flex>
                    
                    <AssignmentTable assignments={singleClass.assignments}/>
                    <input type="date"></input>

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
