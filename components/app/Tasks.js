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
    useDisclosure,
    Heading,
    Checkbox
} from "@chakra-ui/react";
import TaskModal from './TaskModal';
import TaskItem from './TaskItem';


export default function Tasks({ taskList }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const sortByPriority = taskList.sort((x, y) => x.priority - y.priority);
    const sortedList = sortByPriority.sort((x, y) => x.checked - y.checked);

    return (
        <Box>
            <Flex align="center">
                <Heading>Tasks</Heading>
                <Spacer/>
                <Button colorScheme="green" size="sm" mr="12%" onClick={onOpen}>Add Task</Button>
            </Flex>
            
            <List spacing={3} mt={3}>
                {sortedList.map((task) => {
                    return(
                        <TaskItem task={task} key={task.name}/>
                    );
                })}
            </List>

            <TaskModal isOpen={isOpen} onClose={onClose} />

        </Box>
    )
}
