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
} from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons';
import { useAuth } from '../../lib/auth';
import { editClassTime } from '../../lib/writeTodb';


export default function TimeTableItem({ classname, t }) {

    const [ editing, setEditing ] = useState(false);
    const id = t.id;
    const [ time, setTime ] = useState(t.time);
    const [ day, setDay ] = useState(t.day);
    const [ type, setType ] = useState(t.type);
    const [ classroom, setClassroom ] = useState(t.classroom);

    const { auth } = useAuth();

    const submitHandler = () => {
        //check errors

        const timeObject = {
            id, time, day, type, classroom
        }

        editClassTime(auth.uid, auth.classes, timeObject, classname);
        setEditing(false);
    }

    return (
        <Tr>
            <Td>
                <Editable 
                    defaultValue={t.time}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    onChange={(e) => setTime(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
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
