import React, { useState } from 'react';
import {
    Box, 
    Flex, 
    Text, 
    ListItem,
    Checkbox,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { toggleTask } from '../../lib/writeTodb';
import TaskModal from './TaskModal';

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


export default function TaskItem({ task, uid, allTasks, allClasses }) {

  const [ boxChecked, setBoxChecked ] = useState(task.checked);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleHandler = (e) => {
    setBoxChecked(e.target.checked);
    toggleTask(uid, allTasks, task.id);
  }

  return (
    <ListItem>
      <Flex>
        <Checkbox size={'lg'} colorScheme={'green'} isChecked={boxChecked} onChange={toggleHandler} />
        <Button p={5} bg={priorityColor(task.priority)} fontSize={15} borderRadius={10} ml={2} fontWeight="medium" onClick={onOpen}>
          {boxChecked ?
          <Text textDecorationLine="line-through" textDecorationColor="black"> {task.name} ({task.className}) - {task.dueDate.substring(5, 10).replace('-', '/')} </Text>
            :
          <Text> {task.name} ({task.className}) - {task.dueDate.substring(5, 10).replace('-', '/')} </Text>
          }
        </Button>
        <TaskModal isOpen={isOpen} onClose={onClose} uid={uid} tasks={allTasks} classes={allClasses} isEdit={true} taskObject={task} />
      </Flex>
    </ListItem> 
  )
}

/*
<Text bg={priorityColor(task.priority)} color={priorityColor(task.priority)} ml={2}> --------- </Text>
              <Text> {task.checked ? "Checked" : "Not-Checked"} </Text>*/
