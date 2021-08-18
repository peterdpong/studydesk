import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from "@chakra-ui/react";
import TimeTableItem from './TimeTableItem';


export default function ClassTimesTable({ times, name }) {

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
                    //const { isOpen, onOpen, onClose } = useDisclosure();  
             
                    return(
                        <TimeTableItem t={t} classname={name} key={t.id}/>
                    )
                })}
            </Tbody>
        </Table>
    )
}

//<EditClassTimeModal timeObject={t} isOpen={isOpen} onClose={onClose}/>