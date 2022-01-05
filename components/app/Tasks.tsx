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
import { Task } from '../../lib/models/Task';
import { Class } from '../../lib/models/Class';

//TODO: Look at Task ID generation and need

export default function Tasks(props: {taskList: Task[] | undefined, classList: Class[] | undefined, uid: string | undefined}) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const sortByPriority = props.taskList?.sort((x, y) => x.priority - y.priority);
    const sortedList = sortByPriority?.sort((x, y) => Number(x.status) - Number( y.status)); //TODO: redo this as this is hacky boolean subtraction

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
                {sortedList?.map((task) => {
                    return(
                        <TaskItem task={task} uid={props.uid!} key={task.id} allTasks={props.taskList!} allClasses={props.classList!} />
                    );
                })}
            </List>
            
            {/* Task Edit Modal? -> Need to determine which task is clicked? */}
            {/* <TaskModal isOpen={isOpen} onClose={onClose} uid={uid} tasks={taskList} classes={classList} isEdit={false}/> */}

        </Box>
    )
}