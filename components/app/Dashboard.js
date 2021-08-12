import React from 'react';
import { 
    AspectRatio,
    Box, 
    Flex, 
    Text, 
    Grid, 
    Button,
} from "@chakra-ui/react";
import Link from 'next/link';

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

    return (
        <Flex>
            <Box bg="blue.500" w="70%" p={4}>
                <Text fontSize="35">
                    Classes
                </Text>

                <Grid templateColumns="repeat(4, 1fr)" gap={10} m={5} pb={10}>
                    {classList.map((c) => {
                        return(
                            <AspectRatio key={c.name} w="100%" ratio={1.5}>
                                <Link href={`/app/class/${c.name}`}>
                                    <Button border="none" bg="green">
                                        <Text>
                                            {c.name}
                                        </Text>
                                    </Button>
                                </Link>
                            </AspectRatio>
                        );
                    })}
                </Grid>
            </Box>

            <Box bg="red.400" w="30%" p={4}>
                <Box h="50%">
                    <Text fontSize={35}>Tasks</Text>
                    {taskList.map((task) => {
                        return(
                            <Box key={task.name}>
                                <Text fontSize={20}>{task.name} {task.dueDate}</Text>
                            </Box>
                        );
                    })}
                </Box>
                <Box>
                    <Text fontSize={35}>Calendar</Text>
                </Box>
            </Box>
        </Flex>
        
    )
}
