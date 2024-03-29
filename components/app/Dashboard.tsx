import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import 'react-calendar/dist/Calendar.css'
import Tasks from './Tasks'
import MainCalendar from './MainCalendar'
import ClassList from './ClassList'
import { useAuth } from '../../lib/auth'
import { ClassModel } from '../../lib/models/ClassModel'
import { ClassTypes } from '../../lib/models/ClassTimes'
import { newClass } from '../../lib/db-actions/ClassActions'
import { newTask } from '../../lib/db-actions/TaskActions'

const classList: ClassModel[] = [
  {
    name: 'Example Class',
    teacherName: '',
    syllabus: '',
    classTimes: [
      {
        className: 'Example Class',
        startTime: '09:00',
        endTime: '10:00',
        day: 'Mon',
        type: ClassTypes.Lecture,
        classRoom: 'Example Classroom',
      },
    ],
    assignments: [
      {
        id: Math.random(),
        name: 'Example Assignment',
        className: 'Example Class',
        dueDate: '2021-09-08',
        weight: 5,
        grade: 80,
      },
    ],
    color: '#FFFFFF',
  },
]

const taskList = [
  {
    id: Math.random(),
    name: 'Task1',
    dueDate: '2021-09-26',
    className: 'Example Class',
    priority: 2,
    checked: false,
  },
]

export default function Classes() {
  const { useRequiredAuth } = useAuth()
  const auth = useRequiredAuth()

  if (auth!.classes?.length === 0) {
    newClass(auth!.uid, classList)
  }

  if (auth!.tasks?.length === 0) {
    newTask(auth!.uid, taskList)
  }

  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Box w={{ base: '100%', md: '65%' }} p={10}>
        <ClassList classList={auth!.classes!} uid={auth!.uid!} />
      </Box>

      <Box w={{ base: '100%', md: '35%' }} p={10}>
        <Tasks
          taskList={auth!.tasks}
          classList={auth!.classes}
          uid={auth!.uid}
        />
        <Box mt={50}>
          <MainCalendar
            uid={auth!.uid!}
            tasks={auth!.tasks!}
            classes={auth!.classes!}
          />
        </Box>
      </Box>
    </Flex>
  )
}
