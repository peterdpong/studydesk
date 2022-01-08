import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from "@chakra-ui/react";
import TimeTableItem from './TimeTableItem';
import { ClassTimes } from '../../../lib/models/ClassTimes';
import { Class } from '../../../lib/models/Class';


export default function ClassTimesTable(props: { times: ClassTimes[], name: string | string[] | undefined, uid: string | undefined, classes: Class[] | undefined }) {

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
                {props.times.map((t: any) => {
                    return(
                        <TimeTableItem t={t} classname={props.name} key={t.id} uid={props.uid} classes={props.classes} />
                    )
                })}
            </Tbody>
        </Table>
    )
}

//<EditClassTimeModal timeObject={t} isOpen={isOpen} onClose={onClose}/>