import React from 'react';
import {
    Box, 
    Flex, 
    Text, 
    ListItem,
    Checkbox,
} from "@chakra-ui/react";

const priorityColor = (priority) => {
  let color = '';

  switch (priority) {
    case 1:
      color = "teal";
      break;
    case 2:
      color = "teal.400";
      break;
    case 3:
      color = "teal.200";
      break;
    case 4:
      color = "teal.100";
      break;
    case 5:
      color = "teal.50";
      break;
    default:
      color = "blue.50";
      break;
  }
  
  return color;
}

/*case 1:
      color = "red.500";
      break;
    case 2:
      color = "orange.300";
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
      break; */


export default function TaskItem({ task }) {

  return (
    <ListItem>
      <Checkbox size={'lg'} colorScheme={'green'} isChecked={task.checked} onChange={(e) => console.log(e.target.checked)}>
        <Flex bg={priorityColor(task.priority)} direction={'column'} fontSize={15} borderRadius={10}>
          <Box p={3}>
            <Text> {task.name} ({task.className}) - {task.dueDate.substring(5, 10).replace('-', '/')} </Text>
          </Box>
        </Flex>
      </Checkbox>
    </ListItem> 
  )
}

/*
<Text bg={priorityColor(task.priority)} color={priorityColor(task.priority)} ml={2}> --------- </Text>
              <Text> {task.checked ? "Checked" : "Not-Checked"} </Text>*/
