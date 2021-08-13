import React from 'react';
import {
    Box, 
    Flex, 
    Text, 
    ListItem,
    Checkbox,
} from "@chakra-ui/react";

export default function TaskItem({ task }) {

  const priorityColor = (priority) => {
    let color = '';

    switch (priority) {
      case 1:
        color = "red.500";
        break;
      case 2:
        color = "orange.400";
        break;
      case 3:
        color = "yellow.300";
        break;
      case 4:
        color = "green.300";
        break;
      case 5:
        color = "blue.300";
        break;
      default:
        color = "blue.50";
        break;
    }
    
    return color;
  }

  return (
    <ListItem>
      <Checkbox size={'lg'} colorScheme={'green'}>
        <Flex direction={'column'} fontSize={15}>
          <Text> {task.name} - {task.dueDate.substring(0, 5)} </Text>
          <Text> {task.className} </Text>
          <Box bg={priorityColor(task.priority)}> {task.priority} </Box>
          <Text> {task.checked ? "Checked" : "Not-Checked"} </Text>
        </Flex>
      </Checkbox>
    </ListItem> 
  )
}