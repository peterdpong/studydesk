import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from "@chakra-ui/react";
import TimeTableItem from './TimeTableItem';


export default function ClassTimesTable({ times, name, uid, classes }) {

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
                        <TimeTableItem t={t} classname={name} key={t.id} uid={uid} classes={classes} />
                    )
                })}
            </Tbody>
        </Table>
    )
}

//<EditClassTimeModal timeObject={t} isOpen={isOpen} onClose={onClose}/>