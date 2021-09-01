import React, { useState } from 'react';
import {
    Box, 
    Flex, 
    Text, 
    ListItem,
    Checkbox,
    Button,
    useDisclosure,
    Icon,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    ButtonGroup
} from "@chakra-ui/react";
import { toggleTask, deleteTask} from '../../lib/writeTodb';
import TaskModal from './modals/TaskModal';
import { BsThreeDotsVertical } from 'react-icons/bs';


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
  const [ isModOpen, setIsModOpen ] = useState(false);


  const toggleHandler = (e) => {
    setBoxChecked(e.target.checked);
    toggleTask(uid, allTasks, task.id);
  }

  const deleteHandler = () => {
    deleteTask(uid, allTasks, task.id);
  }

  return (
    <ListItem>
      <Flex align="center">
        <Checkbox size={'lg'} colorScheme={'green'} isChecked={boxChecked} onChange={toggleHandler} />
        <Box p={3} bg={priorityColor(task.priority)} fontSize={15} borderRadius={10} ml={3} fontWeight="medium">
          {boxChecked ?
          <Text textDecorationLine="line-through" textDecorationColor="black"> {task.name} ({task.className}) - {task.dueDate.substring(5, 10).replace('-', '/')} </Text>
            :
          <Text> {task.name} ({task.className}) - {task.dueDate.substring(5, 10).replace('-', '/')} </Text>
          }
        </Box>
        <TaskModal isOpen={isOpen} onClose={onClose} uid={uid} tasks={allTasks} classes={allClasses} isEdit={true} taskObject={task} />
        
        <Popover
          returnFocusOnClose={false}
          isOpen={isModOpen}
          onClose={() => setIsModOpen(false)}
          placement="bottom"
          closeOnBlur={true}
          matchWidth={true}
        >
          <PopoverTrigger>
            <IconButton 
              onClick={() => setIsModOpen(!isModOpen)}
              bg="white" 
              size="sm" 
              borderRadius={20}
              icon={<Icon as={BsThreeDotsVertical}/>}/>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody d="flex" justifyContent="center">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={() => {setIsModOpen(false); onOpen()}}>Edit</Button>
                <Button colorScheme="red" onClick={() => {setIsModOpen(false); deleteHandler()}}>Delete</Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        
      </Flex>
      
    </ListItem> 
  )
}