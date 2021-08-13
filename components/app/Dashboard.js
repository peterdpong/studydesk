import React, { useState } from 'react';
import { 
    AspectRatio,
    Box, 
    Flex, 
    Text, 
    Grid, 
    Button,
    SimpleGrid,
    Spacer,
    Heading,
    useBreakpoint,
    useBreakpointValue
} from "@chakra-ui/react";
import Link from 'next/link';
import 'react-calendar/dist/Calendar.css';
import Tasks from './Tasks';
import MainCalendar from './MainCalendar';
import { AddIcon } from '@chakra-ui/icons';


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

    const buttonSize = useBreakpointValue({base: "sm", md: "md"});

    return (
        <Flex direction={{ base: "column", md: "row" }}>
            <Box bg="blue.50" w={{base: "100%", md: "70%"}} p={10}>
              <Flex align="center" pb={5}>
                <Heading>
                    Classes
                </Heading>
                <Spacer/>
                <Button colorScheme="green" size={buttonSize} onClick={addNewClass} rightIcon={<AddIcon/>}>New class</Button>

              </Flex>
                

                <SimpleGrid minChildWidth={{base: 100, md: 200}} spacing="4" justifyItems="center">
                  {classList.map((c) => {
                        return(
                          <Link href={`/app/class/${c.name}`}>
                            <Button border="none" colorScheme={'green'} w={{base: 100, md: 200}} h={{base: 100, md: 125}} borderRadius={20}>
                              <Text>
                                  {c.name}
                              </Text>
                            </Button>
                            
                          </Link>
                        );
                    })}
                </SimpleGrid>
            </Box>

            <Box bg="blue.50" w={{base: "100%", md: "30%"}} p={10}>
                <Tasks taskList={taskList}/>
                <MainCalendar/>
            </Box>
        </Flex>
        
    )
}
