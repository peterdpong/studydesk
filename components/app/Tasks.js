import React from 'react';
import {
    Box, 
    Flex, 
    Text, 
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";


export default function Tasks({ taskList }) {
    return (
        <Box>
            <Text fontSize={30}>Tasks</Text>
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
        </Box>
    )
}
