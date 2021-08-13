import React, { useState } from 'react';
import { 
    AspectRatio,
    Box, 
    Flex, 
    Text, 
    Grid, 
    Button,
} from "@chakra-ui/react";
import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tasks from './Tasks';
import MainCalendar from './MainCalendar';


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
            dueDate: "09/26/2021"
        },
        {
            name: "Task2",
            dueDate: "09/26/2021"
        },
        {
            name: "Task3",
            dueDate: "09/26/2021"
        }
    ]


    const addNewClass = (e) => {
        e.preventDefault();
        console.log('Add new class');
    }

    return (
        <Flex>
            <Box bg="blue.50" w="70%" p={4}>
                <Text fontSize={30}>
                    Classes
                </Text>

                <Grid templateColumns="repeat(4, 1fr)" gap={10} m={5} pb={10}>
                    {classList.map((c) => {
                        return(
                            <AspectRatio key={c.name} w="100%" ratio={1.5}>
                                <Link href={`/app/class/${c.name}`}>
                                    <Button border="none" bg="green.300" borderRadius={20}>
                                        <Text>
                                            {c.name}
                                        </Text>
                                    </Button>
                                </Link>
                            </AspectRatio>
                        );
                    })}
                    <AspectRatio w="100%" ratio={1.5}>
                        <Button border="none" bg="green.300" borderRadius={20} onClick={addNewClass}>
                            <Text fontSize={20}>+</Text>
                        </Button>
                    </AspectRatio>
                </Grid>
            </Box>

            <Box bg="blue.50" w="30%" p={4}>
                <Tasks taskList={taskList}/>
                <MainCalendar/>
            </Box>
        </Flex>
        
    )
}
