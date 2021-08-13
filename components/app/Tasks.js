import React from 'react';
import {
    Box, 
    Button,
    Flex, 
    Text, 
    List,
    ListItem,
    ListIcon,
    Spacer,
    useDisclosure
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import TaskModal from './TaskModal';


export default function Tasks({ taskList }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Flex align="center">
                <Text fontSize={30}>Tasks</Text>
                <Spacer/>
                <Button colorScheme="green" size="sm" mr="12%" onClick={onOpen}>Add Task</Button>
            </Flex>
            
            <List spacing={3} mt={3}>
                {taskList.map((task) => {
                    return(
                        <ListItem>
                            <Flex fontSize={20}>
                                <ListIcon mt={1.5} as={MdCheckCircle} color="green.500"/>
                                <Text> {task.name} - {task.dueDate.substring(0, 5)}</Text>
                            </Flex>
                        </ListItem> 
                    );
                })}
            </List>

            <TaskModal isOpen={isOpen} onClose={onClose} />

        </Box>
    )
}
