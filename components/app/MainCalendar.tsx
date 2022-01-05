import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    Box, 
    Heading,
    useDisclosure
} from "@chakra-ui/react";
import { findCalendarMatch } from '../../lib/writeTodb';
import CalendarModal from './modals/CalendarModal';
import { Task } from '../../lib/models/Task';
import { Class } from '../../lib/models/Class';


const sortByTime = (times: any[]) => {
    times.sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
    });

    return times;
}


export default function MainCalendar(props: { uid: string, tasks: Task[], classes: Class[] }) {
    const [ value, setValue ] = useState(new Date());
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ date, setDate ] = useState('');
    const [ day, setDay ] = useState('');
    const [ assignmentList, setAssignmentList ] = useState<any[]>([]);
    const [ taskList, setTaskList ] = useState<any[]>([]);
    const [ classList, setClassList ] = useState<any[]>([]);

    const onChange = (nextValue: Date) => {
        setValue(nextValue);
        const dateString = nextValue
            .toISOString()
            .substring(0, 10)

        const dayString = nextValue
            .toString()
            .substring(0, 3)

        setDate(dateString.substring(5, 10).replace('-', '/'));
        setDay(dayString);

        const { assignmentArray, taskArray, classArray } = findCalendarMatch(props.tasks, props.classes, dateString, dayString);
        setAssignmentList(assignmentArray);
        setTaskList(taskArray);
        setClassList(sortByTime(classArray));
        onOpen();
    }


    return (
        <Box mt={5}>
            <Heading mb={2} textAlign={{base: "center", md: "left"}}>Calendar</Heading>
            <Box align="center" mt={5}>
                <Calendar
                    onChange={onChange}
                    value={value}
                />
            </Box>
            <CalendarModal isOpen={isOpen} onClose={onClose} classList={classList} assignmentList={assignmentList} taskList={taskList} date={date} day={day} />
        </Box>
        
    )
}
