import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select
} from "@chakra-ui/react";
import { addTask, editTask } from '../../lib/writeTodb';


const priorityPicker = (priorityNumber) => {
  let priority = 0;

  switch (priorityNumber) {
    case 1:
      priority = 'Very High';
      break;
    case 2:
      priority = 'High';
      break;
    case 3:
      priority = 'Medium';
      break;
    case 4:
      priority = 'Low';
      break;
    case 5:
      priority = 'Very Low';
      break;
    default:
      priority = 'Priority';
      break;
  }
  
  return priority;
}

const priorityNumberPicker = (priority) => {
  let number = 0;

  switch (priority) {
    case 'Very High':
      number = 1;
      break;
    case 'High':
      number = 2;
      break;
    case 'Medium':
      number = 3;
      break;
    case 'Low':
      number = 4;
      break;
    case 'Very Low':
      number = 5;
      break;
    default:
      number = 5;
      break;
  }
  
  return number;
}


export default function TaskModal({ isOpen, onClose, uid, tasks, classes, isEdit, taskObject }) {

  const [ name, setName ] = isEdit ? useState(taskObject.name) : useState('');
  const [ className, setClassName ] = isEdit ? useState(taskObject.className) : useState('');
  const [ dueDate, setDueDate ] = isEdit ? useState(taskObject.dueDate) : useState('');
  const [ priority, setPriority ] = isEdit ? useState(priorityPicker(taskObject.priority)) : useState('');    

  const resetVariables = () => {
    setName('');
    setClassName('');
    setDueDate('');
    setPriority('');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if(name.length === 0){
      alert("Please enter a name");
      return;
    }

    if(className.length === 0){
      alert("Please select a class name");
      return;
    }

    if(dueDate.length === 0){
      alert("Please select a date");
      return;
    }

    if(priority.length === 0){
      alert("Please set a priority");
      return;
    }

    const priorityNumber = priorityNumberPicker(priority);

    const newObject = {
      name,
      dueDate,
      className,
      priority: priorityNumber
    }

    if(isEdit){
      const editObject = {...newObject, id: taskObject.id, checked: taskObject.checked};
      editTask(uid, tasks, taskObject.id, editObject);
    }
    else{
      const addObject = {...newObject, id: Math.random(), checked: false};
      const updatedTasks = tasks.concat(addObject);
      addTask(uid, updatedTasks);
      resetVariables();
    }
    
    onClose();
  }

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        {isEdit ? 
          <ModalHeader>Edit Task</ModalHeader>
          :
          <ModalHeader>Add Task</ModalHeader>
        }
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="assignment-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Assignment name" value={name} onChange={(e) => setName(e.target.value)}/>
          </FormControl>

          <FormControl id="assignment-class" isRequired>
            <FormLabel mt={5}>Class</FormLabel>
            <Select placeholder="Select class" value={className} onChange={(e) => setClassName(e.target.value)}>
              {classes.map((c) => {
                return(
                  <option key={c.name}>{c.name}</option>
                )
              })}
            </Select>
          </FormControl>

          <FormControl id="assignment-date" isRequired>
            <FormLabel mt={5}>Due Date</FormLabel>
            <Input placeholder="Due Date" value={dueDate} type="date" onChange={(e) => setDueDate(e.target.value)}/>
          </FormControl>

          <FormControl id="assignment-priority" isRequired>
            <FormLabel mt={5}>Priority</FormLabel>
            <Select placeholder="Select priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Very High</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
              <option>Very Low</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={submitHandler}>
          {isEdit ?
          <Text>Save changes</Text>
            :
          <Text>Submit</Text>
          }
          </Button>
          <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
          Close
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
