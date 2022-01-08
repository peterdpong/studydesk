import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from "@chakra-ui/react";
import AssignmentTableItem from './AssignmentTableItem';
import { Class } from '../../../lib/models/Class';

export default function AssignmentTable(props: { assignments: Object[], name: string | string[] | undefined, uid: string | undefined, classes: Class[] | undefined }) {
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
                {props.assignments.map((a: any) => {
                    return(
                        <AssignmentTableItem a={a} key={a.id} classname={props.name} uid={props.uid} classes={props.classes} />
                    )
                })}
            </Tbody>
        </Table>
    )
}