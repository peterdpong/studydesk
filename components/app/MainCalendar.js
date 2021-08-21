import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    Box, 
    Heading,
    Text
} from "@chakra-ui/react";
import { findCalendarMatch } from '../../lib/writeTodb';

export default function MainCalendar({ uid, tasks, classes }) {
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
        const dateString = nextValue
            .toISOString()
            .substring(0, 10)

        console.log('Show classes on:', dateString);
        const { assignmentArray, taskArray } = findCalendarMatch(tasks, classes, dateString);
        console.log('assignments:', assignmentArray);
        console.log('tasks:', taskArray);
    }

    return (
        <Box mt={5}>
            <Heading mb={2}>Calendar</Heading>
            <Box align="center" mt={5}>
                <Calendar
                    onChange={onChange}
                    value={value}
                />
            </Box>
        </Box>
    )
}
