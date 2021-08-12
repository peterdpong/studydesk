import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from "@chakra-ui/react";

export default function AssignmentTable({assignments}) {
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
                        <Tr key={a.name}>
                            <Td>{a.name}</Td>
                            <Td>{a.dueDate}</Td>
                            <Td>{a.weight}%</Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}
