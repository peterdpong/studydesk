import React from 'react';
import {
    Box, 
    Button,
    Flex, 
    List,
    Spacer,
    useDisclosure,
    Heading,
} from "@chakra-ui/react";
import TaskModal from './modals/TaskModal';
import TaskItem from './TaskItem';
import PriorityBar from './PriorityBar';


export default function Tasks({ taskList, classList, uid }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const sortByPriority = taskList.sort((x, y) => x.priority - y.priority);
    const sortedList = sortByPriority.sort((x, y) => x.checked - y.checked);

    return (
        <Box>
            <Box align="center" display={{md: "flex"}}>
                <Heading>Tasks</Heading>
                <Spacer/>
                <Box align="right" mr={{md: "12%"}} mt={2}>
                    <Button colorScheme="green" size="sm" onClick={onOpen}>Add Task</Button>
                </Box>
            </Box>

            <PriorityBar/>
            
            <List spacing={3} mt={3}>
                {sortedList.map((task) => {
                    return(
                        <TaskItem task={task} uid={uid} key={task.id} allTasks={taskList} allClasses={classList} />
                    );
                })}
            </List>
            
            <TaskModal isOpen={isOpen} onClose={onClose} uid={uid} tasks={taskList} classes={classList} isEdit={false} />

        </Box>
    )
}

/*<Flex align="center">
                <Heading>Tasks</Heading>
                <Spacer/>
                <Button colorScheme="green" size="sm" mr="12%" onClick={onOpen}>Add Task</Button>
            </Flex> */