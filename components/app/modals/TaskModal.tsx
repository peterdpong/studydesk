import React, { useState } from 'react'
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
  Select,
  Flex,
} from '@chakra-ui/react'
import { Task } from '../../../lib/models/Task'
import { ClassModel } from '../../../lib/models/ClassModel'
import { addTask, editTask } from '../../../lib/db-actions/TaskActions'

const priorityPicker = (priorityNumber: number) => {
  let priority: string = ''

  switch (priorityNumber) {
    case 1:
      priority = 'Very High'
      break
    case 2:
      priority = 'High'
      break
    case 3:
      priority = 'Medium'
      break
    case 4:
      priority = 'Low'
      break
    case 5:
      priority = 'Very Low'
      break
    default:
      priority = 'Priority'
      break
  }

  return priority
}

const priorityNumberPicker = (priority: string) => {
  let number = 0

  switch (priority) {
    case 'Very High':
      number = 1
      break
    case 'High':
      number = 2
      break
    case 'Medium':
      number = 3
      break
    case 'Low':
      number = 4
      break
    case 'Very Low':
      number = 5
      break
    default:
      number = 5
      break
  }

  return number
}

export default function TaskModal(props: {
  isOpen: boolean
  onClose: () => void
  uid: string
  tasks: Task[]
  classes: ClassModel[]
  isEdit: boolean
  taskObject: Task
}) {
  const [name, setName] = useState(props.isEdit ? props.taskObject.name : '')
  const [className, setClassName] = useState(
    props.isEdit ? props.taskObject.className : ''
  )
  const [dueDate, setDueDate] = useState(
    props.isEdit ? props.taskObject.dueDate : ''
  )
  const [priority, setPriority] = useState<number | undefined>(
    props.isEdit ? props.taskObject.priority : undefined
  )

  const resetVariables = () => {
    setName('')
    setClassName('')
    setDueDate('')
    setPriority(undefined)
  }

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (name.length === 0) {
      alert('Please enter a name')
      return
    }

    if (className.length === 0) {
      alert('Please select a class name')
      return
    }

    if (dueDate.length === 0) {
      alert('Please select a date')
      return
    }

    if (priority === 0) {
      alert('Please set a priority')
      return
    }

    //const priorityNumber = priorityNumberPicker(priority);

    const newObject = {
      name: name,
      className: '',
      dueDate: dueDate,
      class: className,
      priority: priority!,
    }

    if (props.isEdit) {
      const editObject: Task = {
        ...newObject,
        id: props.taskObject.id,
        checked: props.taskObject.checked,
      }
      editTask(props.uid, props.tasks, props.taskObject.id, editObject)
    } else {
      const addObject: Task = {
        ...newObject,
        id: Math.random(),
        checked: false,
      }
      const updatedTasks = props.tasks.concat(addObject)
      addTask(props.uid, updatedTasks)
      resetVariables()
    }

    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        {props.isEdit ? (
          <ModalHeader>Edit Task</ModalHeader>
        ) : (
          <ModalHeader>Add Task</ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="assignment-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Assignment name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="assignment-class" isRequired>
            <FormLabel mt={5}>Class</FormLabel>
            <Select
              placeholder="Select class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              {props.classes.map((c) => {
                return <option key={c.name}>{c.name}</option>
              })}
            </Select>
          </FormControl>

          <FormControl id="assignment-date" isRequired>
            <FormLabel mt={5}>Due Date</FormLabel>
            <Input
              placeholder="Due Date"
              value={dueDate}
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormControl>

          <FormControl id="assignment-priority" isRequired>
            <FormLabel mt={5}>Priority</FormLabel>
            <Select
              placeholder="Select priority"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
            >
              <option value={5}>Very High</option>
              <option value={4}>High</option>
              <option value={3}>Medium</option>
              <option value={2}>Low</option>
              <option value={1}>Very Low</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={submitHandler}>
            {props.isEdit ? <Text>Save changes</Text> : <Text>Submit</Text>}
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            mr={3}
            onClick={props.onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
