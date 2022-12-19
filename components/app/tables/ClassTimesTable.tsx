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
import { ClassModel } from '../../../lib/models/ClassModel';


export default function ClassTimesTable(props: { times: ClassTimes[], name: string | undefined, uid: string | undefined, classes: ClassModel[] | undefined }) {

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
                {props.times.map((t: ClassTimes, index: number) => {
                    return(
                        <TimeTableItem key={index} t={t} classname={props.name} uid={props.uid} classes={props.classes} />
                    )
                })}
            </Tbody>
        </Table>
    )
}

//<EditClassTimeModal timeObject={t} isOpen={isOpen} onClose={onClose}/>