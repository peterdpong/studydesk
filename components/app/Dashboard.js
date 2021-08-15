import React, { useState } from 'react';
import {
    Box, 
    Flex
} from "@chakra-ui/react";
import 'react-calendar/dist/Calendar.css';
import Tasks from './Tasks';
import MainCalendar from './MainCalendar';
import ClassList from './ClassList';


export default function Classes({ user }) {

    const classList = [
      {
        name: "ECE302",
        times: [
            
        ],
        assignments: [

        ]
      },
      {
        name: "ECE344",
        times: [
            
        ],
        assignments: [
            
        ]
      },
      {
        name: "ECE345",
        times: [
            
        ],
        assignments: [
            
        ]
      },
      {
        name: "ECE472",
        times: [
            
        ],
        assignments: [
            
        ]
      },
      {
        name: "SOC100",
        times: [
            
        ],
        assignments: [
            
        ]
      }
    ]

    //get classes using user id
    
    const taskList = [
      {
        name: "Task1",
        dueDate: "09/26/2021",
        className: "ECE302",
        priority: 2,
        checked: false
      },
      {
        name: "Task2",
        dueDate: "09/26/2021",
        className: "ECE345",
        priority: 3,
        checked: true
      },
      {
        name: "Task3",
        dueDate: "09/26/2021",
        className: "ECE344",
        priority: 1,
        checked: false
      },
      {
        name: "Task4",
        dueDate: "09/26/2021",
        className: "ECE345",
        priority: 4,
        checked: true
      },
      {
        name: "Task5",
        dueDate: "09/26/2021",
        className: "ECE344",
        priority: 5,
        checked: false
      }
    ]

    return (
        <Flex direction={{ base: "column", md: "row" }}>
            <Box bg="blue.50" w={{base: "100%", md: "65%"}} p={10}>
              <ClassList classList={classList}/>
            </Box>

            <Box bg="blue.50" w={{base: "100%", md: "35%"}} p={10}>
                <Tasks taskList={taskList}/>
                <MainCalendar/>
            </Box>
        </Flex>
    )
}
