import React from 'react';
import {
    Box, 
    Flex
} from "@chakra-ui/react";
import 'react-calendar/dist/Calendar.css';
import Tasks from './Tasks';
import MainCalendar from './MainCalendar';
import ClassList from './ClassList';
import firebase from '../../lib/firebase';


const classList = [
  {
    name: "Example Class",
    times: [
      {
        id: Math.random(),
        className: "Example Class",
        startTime: "09:00",
        endTime: "10:00",
        day: "Mon",
        type: "Lecture",
        classroom: "Example Classroom"
    }
    ],
    assignments: [
      {
        id: Math.random(),
        name: "Example Assignment",
        className: "Example Class",
        dueDate: "2021-09-08",
        weight: 5,
        grade: 80
      }
    ]
  }
]


const taskList = [
  { 
    id: Math.random(),
    name: "Task1",
    dueDate: "2021-09-26",
    className: "Example Class",
    priority: 2,
    checked: false
  }
]


export default function Classes({ auth }) {

  const refToUserData = firebase.firestore().collection("users").doc(auth.uid);

  if(auth.classes.length === 0){
    refToUserData
    .update({
      classes: classList
    })
    .catch(
        (err) => console.log(err)
    )
  }

  if(auth.tasks.length === 0){
    refToUserData
    .update({
      tasks: taskList
    })
    .catch(
        (err) => console.log(err)
    )
  }
  
  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Box w={{base: "100%", md: "65%"}} p={10}>
        <ClassList classList={auth.classes} uid={auth.uid}/>
      </Box>

      <Box w={{base: "100%", md: "35%"}} p={10}>
        <Tasks taskList={auth.tasks} classList={auth.classes} uid={auth.uid}/>
        <MainCalendar uid={auth.uid} tasks={auth.tasks} classes={auth.classes} />
      </Box>
    </Flex>
  )
}
