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
import { MdCheckCircle } from "react-icons/md";
import TaskModal from './TaskModal';


export default function Tasks({ taskList }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Flex align="center">
                <Heading>Tasks</Heading>
                <Spacer/>
                <Button colorScheme="green" size="sm" mr="12%" onClick={onOpen}>Add Task</Button>
            </Flex>
            
            <List spacing={3} mt={3}>
                {taskList.map((task) => {
                    return(
                        <ListItem>
                          <Checkbox size={'lg'} colorScheme={'green'}>
                            <Flex direction={'column'} fontSize={15}>
                              <Text> {task.name} - {task.dueDate.substring(0, 5)}</Text>
                              <Text> Class Name </Text>
                              <Text> Priority </Text>
                            </Flex>
                          </Checkbox>
                   
                        </ListItem> 
                    );
                })}
            </List>

            <TaskModal isOpen={isOpen} onClose={onClose} />

        </Box>
    )
}
