import React from 'react';
import {
    Box, 
    Button,
    Flex, 
    Text, 
    List,
    Spacer,
    useDisclosure,
    Heading,
} from "@chakra-ui/react";
import TaskModal from './TaskModal';
import TaskItem from './TaskItem';
import PriorityBar from './PriorityBar';


export default function Tasks({ taskList, classList, uid }) {

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

            <PriorityBar/>
            
            <List spacing={3} mt={3}>
                {sortedList.map((task) => {
                    return(
                        <TaskItem task={task} uid={uid} key={task.id} allTasks={taskList} />
                    );
                })}
            </List>
            
            <TaskModal isOpen={isOpen} onClose={onClose} uid={uid} tasks={taskList} classes={classList} />

        </Box>
    )
}
