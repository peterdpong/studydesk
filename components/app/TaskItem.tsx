import React, { useState } from 'react'
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
  ButtonGroup,
} from '@chakra-ui/react'
import TaskModal from './modals/TaskModal'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Task } from '../../lib/models/Task'
import { ClassModel } from '../../lib/models/ClassModel'
import { deleteTask, toggleTask } from '../../lib/db-actions/TaskActions'

const priorityColor = (priority: number) => {
  let color = ''

  switch (priority) {
    case 1:
      color = 'teal'
      break
    case 2:
      color = 'teal.400'
      break
    case 3:
      color = 'teal.200'
      break
    case 4:
      color = 'teal.100'
      break
    case 5:
      color = 'teal.50'
      break
    default:
      color = 'blue.50'
      break
  }

  return color
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

export default function TaskItem(props: {
  task: Task
  uid: string
  allTasks: Task[]
  allClasses: ClassModel[]
}) {
  const [boxChecked, setBoxChecked] = useState<boolean>(props.task.checked)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isModOpen, setIsModOpen] = useState(false)

  const toggleHandler = (e: any) => {
    setBoxChecked(e.target.checked)
    toggleTask(props.uid, props.allTasks, props.task.id)
  }

  const deleteHandler = () => {
    deleteTask(props.uid, props.allTasks, props.task.id)
  }

  return (
    <ListItem>
      <Flex align="center">
        <Checkbox
          size={'lg'}
          colorScheme={'green'}
          isChecked={boxChecked}
          onChange={toggleHandler}
        />
        <Box
          p={3}
          bg={priorityColor(props.task.priority)}
          fontSize={15}
          borderRadius={10}
          ml={3}
          fontWeight="medium"
        >
          {boxChecked ? (
            <Text textDecorationLine="line-through" textDecorationColor="black">
              {' '}
              {props.task.name} ({props.task.className}) -{' '}
              {props.task.dueDate.substring(5, 10).replace('-', '/')}{' '}
            </Text>
          ) : (
            <Text>
              {' '}
              {props.task.name} ({props.task.className}) -{' '}
              {props.task.dueDate.substring(5, 10).replace('-', '/')}{' '}
            </Text>
          )}
        </Box>
        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          uid={props.uid}
          tasks={props.allTasks}
          classes={props.allClasses}
          isEdit={true}
          taskObject={props.task}
        />

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
              icon={<Icon as={BsThreeDotsVertical} />}
              aria-label="Edit"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody justifyContent="center">
              <ButtonGroup size="sm">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModOpen(false)
                    onOpen()
                  }}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setIsModOpen(false)
                    deleteHandler()
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </ListItem>
  )
}
