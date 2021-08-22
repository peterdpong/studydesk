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
                    <Th>Grade Received</Th>
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