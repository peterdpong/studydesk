import React from 'react';
import { 
    AspectRatio,
    Box, 
    Flex, 
    Text, 
    Grid, 
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import ClassModal from "./ClassModal";


export default function Classes({ user }) {
    const classList = [
        {
            name: "ECE302",
            times: [
                {
                    time: "9:00-10:00",
                    day: "Mon",
                    type: "Lecture"
                },
                {
                    time: "13:00-14:00",
                    day: "Wed",
                    type: "Tutorial"
                },
                {
                    time: "16:00-18:00",
                    day: "Thu",
                    type: "Practical"
                },
            ],
            assignments: [
                {
                    name: "Default",
                    dueDate: "09/16/2021",
                    weight: 10
                },
                {
                    name: "Default2",
                    dueDate: "09/16/2021",
                    weight: 20
                }
            ]
        },
        {
            name: "ECE344",
            times: [
                {
                    time: "9:00-10:00",
                    day: "Mon",
                    type: "Lecture"
                },
                {
                    time: "13:00-14:00",
                    day: "Wed",
                    type: "Tutorial"
                },
                {
                    time: "16:00-18:00",
                    day: "Thu",
                    type: "Practical"
                },
            ],
            assignments: [
                {
                    name: "Default",
                    dueDate: "09/16/2021",
                    weight: 10
                }
            ]
        },
        {
            name: "ECE345",
            times: [
                {
                    time: "9:00-10:00",
                    day: "Mon",
                    type: "Lecture"
                },
                {
                    time: "13:00-14:00",
                    day: "Wed",
                    type: "Tutorial"
                },
                {
                    time: "16:00-18:00",
                    day: "Thu",
                    type: "Practical"
                },
            ],
            assignments: [
                {
                    name: "Default",
                    dueDate: "09/16/2021",
                    weight: 10
                }
            ]
        },
        {
            name: "ECE472",
            times: [
                {
                    time: "9:00-10:00",
                    day: "Mon",
                    type: "Lecture"
                },
                {
                    time: "13:00-14:00",
                    day: "Wed",
                    type: "Tutorial"
                },
                {
                    time: "16:00-18:00",
                    day: "Thu",
                    type: "Practical"
                },
            ],
            assignments: [
                {
                    name: "Default",
                    dueDate: "09/16/2021",
                    weight: 10
                }
            ]
        },
        {
            name: "SOC100",
            times: [
                {
                    time: "9:00-10:00",
                    day: "Mon",
                    type: "Lecture"
                },
                {
                    time: "13:00-14:00",
                    day: "Wed",
                    type: "Tutorial"
                },
                {
                    time: "16:00-18:00",
                    day: "Thu",
                    type: "Practical"
                },
            ],
            assignments: [
                {
                    name: "Default",
                    dueDate: "09/16/2021",
                    weight: 10
                },
                {
                    name: "Default2",
                    dueDate: "09/16/2021",
                    weight: 10
                }
            ]
        }
    ]

    return (
        <Flex>
            <Box bg="blue.500" w="70%" p={4}>
                <Text fontSize="35">
                    Classes
                </Text>
                <Grid templateColumns="repeat(4, 1fr)" gap={10} m={5}>
                    {classList.map((c) => {
                        const { isOpen, onOpen, onClose } = useDisclosure();

                        return(
                            <AspectRatio key={c.name} w="100%" ratio={1}>
                                <Button border="none" bg="green" onClick={onOpen}>
                                    <Box>
                                        <Text>
                                            {c.name}
                                        </Text>
                                    </Box>

                                    <ClassModal singleClass={c} isOpen={isOpen} onClose={onClose}/>
                                    
                                </Button>
                            </AspectRatio>
                        );
                    })}
                </Grid>
            </Box>

            <Box bg="red.400" w="30%" p={4}>
                <Box>
                    <Text>
                        Tasks
                    </Text>
                </Box>
                <Box>
                    <Text>
                        Calendar
                    </Text>
                </Box>
            </Box>
        </Flex>
        
    )
}
