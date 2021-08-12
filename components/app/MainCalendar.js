import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    Box, 
    Text, 
} from "@chakra-ui/react";

export default function MainCalendar() {
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
        const dateString = nextValue
            .toISOString()
            .substring(0, 10)
            .replaceAll("-", "/");

        //run a for loop of assignments and tasks that match the date

        console.log('Show classes on:', dateString);
    }

    return (
        <Box mt={5}>
            <Text fontSize={30} mb={2}>Calendar</Text>
            <Calendar
                onChange={onChange}
                value={value}
            />
        </Box>
    )
}
