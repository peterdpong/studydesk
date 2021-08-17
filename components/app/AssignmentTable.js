import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Flex, 
    Spacer,
    Button,
    Icon
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';

export default function AssignmentTable({ assignments }) {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Due Date</Th>
                    <Th>Weight</Th>
                </Tr>
            </Thead>
            <Tbody>
                {assignments.map((a) => {
                    return(
                        <Tr key={a.id}>
                            <Td>{a.name}</Td>
                            <Td>{a.dueDate}</Td>
                            <Td>
                                <Flex align="center">
                                    {a.weight}%
                                    <Spacer/>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="blue"
                                        aria-label="Send email"
                                        icon={<EditIcon />}
                                        size="lg"
                                        _hover={{
                                            background: "blue.500",
                                            color: "white"
                                        }}
                                        onClick={() => console.log('click')}
                                    />
                                </Flex>
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}

/*<Button 
    bgColor="white" 
    onClick={() => console.log('click')}
    p={0}
    _hover={{
        background: "blue.400"
    }}>
    <Icon 
        color={'blue.400'} 
        w={5} 
        h={5} 
        as={EditIcon}
        _hover={{
            color: "white"
        }}
    />
</Button>*/