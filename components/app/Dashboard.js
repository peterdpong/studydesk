import React from 'react';
import {
    Box, 
    Flex
} from "@chakra-ui/react";
import 'react-calendar/dist/Calendar.css';
import Tasks from './Tasks';
import MainCalendar from './MainCalendar';
import ClassList from './ClassList';
import { useAuth } from '../../lib/auth';
import firebase from '../../lib/firebase';



const classList = [
  {
    name: "Example Class",
    times: [
      {
        id: Math.random(),
        startTime: "09:00",
        endTime: "10:00",
        day: "Mon",
        type: "Lecture"
    }
    ],
    assignments: [
      {
        id: Math.random(),
        name: "Example Assignment",
        dueDate: "2021-09-08",
        weight: 5
      }
    ]
  }
]

//get classes using user id

const taskList = [
  {
    name: "Task1",
    dueDate: "2021-09-26",
    className: "ECE302",
    priority: 2,
    checked: false
  },
  {
    name: "Task2",
    dueDate: "2021-09-26",
    className: "ECE345",
    priority: 3,
    checked: true
  },
  {
    name: "Task3",
    dueDate: "2021-09-26",
    className: "ECE344",
    priority: 1,
    checked: false
  },
  {
    name: "Task4",
    dueDate: "2021-09-26",
    className: "ECE345",
    priority: 4,
    checked: true
  },
  {
    name: "Task5",
    dueDate: "2021-09-26",
    className: "ECE344",
    priority: 5,
    checked: false
  }
]


export default function Classes({ user }) {

  const refToUserData = firebase.firestore().collection("users").doc(user.uid);

  if(user.classes.length === 0){
    refToUserData
    .update({
      classes: classList
    })
    .catch(
        (err) => console.log(err)
    )
  }

  if(user.tasks.length === 0){
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
        <ClassList classList={user.classes}/>
      </Box>

      <Box w={{base: "100%", md: "35%"}} p={10}>
        <Tasks taskList={user.tasks}/>
        <MainCalendar/>
      </Box>
    </Flex>
  )
}
