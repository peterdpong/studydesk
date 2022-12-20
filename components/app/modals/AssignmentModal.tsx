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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
} from '@chakra-ui/react'
import { ClassModel } from '../../../lib/models/ClassModel'
import { Assignment } from '../../../lib/models/Assignment'
import { addAssignment } from '../../../lib/db-actions/ClassActions'

export default function AssignmentModal(props: {
  isOpen: boolean
  onClose: () => void
  name: string | undefined
  uid: string | undefined
  classes: ClassModel[] | undefined
}) {
  const [assignmentName, setAssignmentName] = useState('')
  const [assignmentDate, setAssignmentDate] = useState('')
  const [assignmentWeight, setAssignmentWeight] = useState(0)

  const resetVariables = () => {
    setAssignmentName('')
    setAssignmentDate('')
    setAssignmentWeight(0)
  }

  const submitHandler = (e: React.MouseEvent<HTMLElement>, name: string) => {
    e.preventDefault()

    if (assignmentName.length === 0) {
      alert('Please enter a name')
      return
    }

    const assignmentObject: Assignment = {
      id: Math.random(),
      name: assignmentName,
      className: name,
      dueDate: assignmentDate,
      weight: assignmentWeight,
      grade: 80,
    }

    if (assignmentDate.length === 0) {
      assignmentObject.dueDate = 'N/A'
    }

    addAssignment(props.uid, props.classes, assignmentObject, name)
    resetVariables()
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent maxW={{ base: '90%', md: 'md' }}>
        <ModalHeader>Add Assignment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="assignment-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Assignment name"
              onChange={(e) => setAssignmentName(e.target.value)}
            />
          </FormControl>

          <FormControl id="assignment-date">
            <FormLabel mt={5}>Due Date</FormLabel>
            <Input
              placeholder="Due Date"
              type="date"
              onChange={(e) => setAssignmentDate(e.target.value)}
            />
          </FormControl>

          <FormControl id="assignment-weight">
            <FormLabel mt={5}>Weight (%)</FormLabel>
            <NumberInput
              max={100}
              min={0}
              onChange={(valueAsString: string, valueAsNumber: number) =>
                setAssignmentWeight(valueAsNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={(e) => submitHandler(e, props.name ? props.name : '')}
          >
            Submit
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
