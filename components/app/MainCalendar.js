import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    Box, 
    Heading
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
