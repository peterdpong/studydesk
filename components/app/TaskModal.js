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
import { addTask } from '../../lib/writeTodb';


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


export default function TaskModal({ isOpen, onClose, uid, tasks, classes }) {

  const [ name, setName ] = useState('');
  const [ className, setClassName ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  const [ priority, setPriority ] = useState('');    

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
      alert("Please enter a class name");
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

    const taskObject = {
      id: Math.random(),
      name,
      dueDate,
      className,
      priority: priorityNumber,
      checked: false
    }

    const updatedTasks = tasks.concat(taskObject);
    addTask(uid, updatedTasks);
    resetVariables();
    onClose();
  }

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="assignment-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Assignment name" onChange={(e) => setName(e.target.value)}/>
          </FormControl>

          <FormControl id="assignment-class" isRequired>
            <FormLabel mt={5}>Class</FormLabel>
            <Select placeholder="Select Class" onChange={(e) => setClassName(e.target.value)}>
              {classes.map((c) => {
                return(
                  <option key={c.name}>{c.name}</option>
                )
              })}
            </Select>
          </FormControl>

          <FormControl id="assignment-date" isRequired>
            <FormLabel mt={5}>Due Date</FormLabel>
            <Input placeholder="Due Date" type="date" onChange={(e) => setDueDate(e.target.value)}/>
          </FormControl>

          <FormControl id="assignment-priority" isRequired>
            <FormLabel mt={5}>Priority</FormLabel>
            <Select placeholder="Select priority" onChange={(e) => setPriority(e.target.value)}>
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
          Submit
          </Button>
          <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
          Close
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
