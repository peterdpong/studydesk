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
import { useAuth } from '../../lib/auth';
import firebase from '../../lib/firebase';


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


export default function TaskModal({ isOpen, onClose }) {

  const [ name, setName ] = useState('');
  const [ className, setClassName ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  const [ priority, setPriority ] = useState('');    
  const { auth } = useAuth();

  const refToUserData = firebase.firestore().collection("users").doc(auth.uid);

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
      name,
      dueDate,
      className,
      priority: priorityNumber,
      checked: false
    }

    const updatedTasks = auth.tasks.concat(taskObject);

    refToUserData
      .update({
        tasks: updatedTasks
      })
      .catch(
        (err) => console.log(err)
      );


    setName('');
    setClassName('');
    setDueDate('');
    setPriority('');
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
            <FormLabel mt={5}>Class Name</FormLabel>
            <Input placeholder="Class Name" onChange={(e) => setClassName(e.target.value)}/>
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
