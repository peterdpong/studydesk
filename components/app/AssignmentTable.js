import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from "@chakra-ui/react";
import AssignmentTableItem from './AssignmentTableItem';

export default function AssignmentTable({ assignments, name, uid, classes }) {
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
                        <AssignmentTableItem a={a} key={a.id} classname={name} uid={uid} classes={classes} />
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