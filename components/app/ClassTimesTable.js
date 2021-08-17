import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from "@chakra-ui/react";

export default function ClassTimesTable({ times }) {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Time</Th>
                    <Th>Day</Th>
                    <Th>Type</Th>
                    <Th>Classroom</Th>
                </Tr>
            </Thead>
            <Tbody>
                {times.map((t) => {
                    return(
                        <Tr key={t.id}>
                            <Td>{t.time}</Td>
                            <Td>{t.day}</Td>
                            <Td>{t.type}</Td>
                            <Td>{t.classroom}</Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}
