import React from 'react';
import { Box, Flex, Text, Grid } from "@chakra-ui/react";


export default function Classes({ user }) {
    const classList = [
        {
            name: "ECE302"
        },
        {
            name: "ECE344"
        },
        {
            name: "ECE345"
        },
        {
            name: "ECE472"
        },
        {
            name: "SOC100"
        }
    ]
    return (
        <Flex>
            <Box bg="blue.500" w="70%" p={4}>
                <Text fontSize="20">
                    Classes
                </Text>
                <Grid templateColumns="repeat(4, 1fr)" gap={10} m={5}>
                    {classList.map((c) => {
                        return(
                            <Box w="100%" h="10" bg="green" key={c.name}>
                                <Text pl={3} pt={1}>
                                    {c.name}
                                </Text>
                            </Box>
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
