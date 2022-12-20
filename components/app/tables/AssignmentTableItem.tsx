import React, { useState } from 'react'
import {
  Tr,
  Td,
  IconButton,
  Flex,
  Spacer,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react'
import DeletePopover from '../DeletePopover'
import { CheckIcon } from '@chakra-ui/icons'
import { ClassModel } from '../../../lib/models/ClassModel'
import { Assignment } from '../../../lib/models/Assignment'
import {
  deleteAssignment,
  editAssignment,
} from '../../../lib/db-actions/ClassActions'

export default function AssignmentTableItem(props: {
  a: any
  classname: string | undefined
  uid: string | undefined
  classes: ClassModel[] | undefined
}) {
  const [editing, setEditing] = useState(false)
  const id = props.a.id
  const [name, setName] = useState(props.a.name)
  const [dueDate, setDueDate] = useState(props.a.dueDate)
  const [weight, setWeight] = useState(props.a.weight)
  const [grade, setGrade] = useState(props.a.grade)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const submitHandler = () => {
    //check for error

    const assignmentObject: Assignment = {
      id,
      name,
      className: '',
      dueDate,
      weight,
      grade,
    }

    // TODO: Check undefined
    editAssignment(
      props.uid,
      props.classes!,
      assignmentObject,
      props.classname ? props.classname : ''
    )
    setEditing(false)
  }

  const deleteHandler = () => {
    deleteAssignment(
      props.uid,
      props.classes!,
      props.classname ? props.classname : '',
      id
    )
  }

  return (
    <Tr key={props.a.id}>
      <Td>
        <Editable
          defaultValue={props.a.name}
          onEdit={() => setEditing(true)}
          onCancel={() => setEditing(false)}
          onChange={(e) => setName(e)}
          onSubmit={submitHandler}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Td>
      <Td>
        <Editable
          defaultValue={props.a.dueDate}
          onEdit={() => setEditing(true)}
          onCancel={() => setEditing(false)}
          onChange={(e) => setDueDate(e)}
          onSubmit={submitHandler}
        >
          <EditablePreview />
          <EditableInput type="date" />
        </Editable>
      </Td>
      <Td>
        <Flex align="center">
          <Editable
            defaultValue={props.a.weight}
            onEdit={() => setEditing(true)}
            onCancel={() => setEditing(false)}
            onChange={(e) => setWeight(e)}
            onSubmit={submitHandler}
          >
            <EditablePreview />
            <EditableInput type="number" />
          </Editable>
          %
        </Flex>
      </Td>
      <Td>
        <Flex align="center">
          <Editable
            defaultValue={props.a.grade}
            onEdit={() => setEditing(true)}
            onCancel={() => setEditing(false)}
            onChange={(e) => setGrade(e)}
            onSubmit={submitHandler}
          >
            <EditablePreview />
            <EditableInput type="number" />
          </Editable>
          %
          <Spacer />
          {editing ? (
            <Flex>
              <IconButton
                variant="ghost"
                colorScheme="blue"
                aria-label="Send email"
                icon={<CheckIcon />}
                size="md"
                _hover={{
                  background: 'blue.500',
                  color: 'white',
                }}
                onClick={() => setEditing(false)}
              />
            </Flex>
          ) : (
            <Flex></Flex>
          )}
          <DeletePopover
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            deleteHandler={deleteHandler}
            body="Are you sure you want to delete this assignment?"
          />
        </Flex>
      </Td>
    </Tr>
  )
}
