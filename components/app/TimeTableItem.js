import React, { useState } from 'react';
import {
    Tr,
    Td,
    IconButton,
    Flex, 
    Spacer,
    Editable, 
    EditableInput,
    EditablePreview,
    Box
} from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons';
import { editClassTime } from '../../lib/writeTodb';


export default function TimeTableItem({ classname, t, uid, classes }) {

    const [ editing, setEditing ] = useState(false);
    const id = t.id;
    const [ startTime, setStartTime ] = useState(t.startTime);
    const [ endTime, setEndTime ] = useState(t.endTime);
    const [ day, setDay ] = useState(t.day);
    const [ type, setType ] = useState(t.type);
    const [ classroom, setClassroom ] = useState(t.classroom);

    const submitHandler = () => {
        //check errors

        const timeObject = {
            id, startTime, endTime, day, type, classroom
        }

        editClassTime(uid, classes, timeObject, classname);
        setEditing(false);
    }

    return (
        <Tr>
            <Td>
                <Flex>
                <Editable 
                    defaultValue={t.startTime}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    onChange={(e) => setStartTime(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput type="time" />
                </Editable>
                <Box mt={0.5}>
                -
                </Box>
                <Editable 
                    defaultValue={t.endTime}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    onChange={(e) => setEndTime(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput type="time" />
                </Editable>
                </Flex>
            </Td>
            <Td>
                <Editable 
                    defaultValue={t.day}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    onChange={(e) => setDay(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Td>
            <Td>
                <Editable 
                    defaultValue={t.type}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    onChange={(e) => setType(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Td>
            <Td>
                <Flex align="center">
                    <Editable 
                        defaultValue={t.classroom}
                        onEdit={() => setEditing(true)}
                        onCancel={() => setEditing(false)}
                        onChange={(e) => setClassroom(e)}
                        onSubmit={submitHandler}>
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <Spacer/>
                    {editing ?
                    <Flex>
                        <IconButton
                            variant="ghost"
                            colorScheme="blue"
                            aria-label="Send email"
                            icon={<CheckIcon />}
                            size="md"
                            _hover={{
                                background: "blue.500",
                                color: "white"
                            }}
                            onClick={() => setEditing(false)}
                        />
                    </Flex>
                    :
                    <Flex>
                    </Flex>
                    }
                </Flex>
            </Td>
        </Tr>
    )
}
