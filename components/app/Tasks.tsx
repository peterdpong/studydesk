import React from 'react'
import {
  Box,
  Button,
  List,
  Spacer,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import TaskItem from './TaskItem'
import PriorityBar from './PriorityBar'
import { Task } from '../../lib/models/Task'
import { ClassModel } from '../../lib/models/ClassModel'

// TODO: Look at Task ID generation and need

export default function Tasks(props: {
  taskList: Task[] | undefined
  classList: ClassModel[] | undefined
  uid: string | undefined
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const sortByPriority = props.taskList?.sort((x, y) => x.priority - y.priority)
  const sortedList = sortByPriority?.sort(
    (x, y) => Number(x.checked) - Number(y.checked)
  ) //TODO: redo this as this is hacky boolean subtraction

  return (
    <Box>
      <Box alignItems="center" display={{ md: 'flex' }}>
        <Heading>Tasks</Heading>
        <Spacer />
        <Box alignItems="right" mr={{ md: '12%' }} mt={2}>
          <Button colorScheme="green" size="sm" onClick={onOpen}>
            Add Task
          </Button>
        </Box>
      </Box>

      <PriorityBar />

      <List spacing={3} mt={3}>
        {sortedList?.map((task) => {
          return (
            <TaskItem
              task={task}
              uid={props.uid!}
              key={task.id}
              allTasks={props.taskList!}
              allClasses={props.classList!}
            />
          )
        })}
      </List>

      {/* Task Edit Modal? -> Need to determine which task is clicked? */}
      {/* <TaskModal isOpen={isOpen} onClose={onClose} uid={uid} tasks={taskList} classes={classList} isEdit={false}/> */}
    </Box>
  )
}
