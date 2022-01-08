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
import DeletePopover from '../DeletePopover';
import { CheckIcon } from '@chakra-ui/icons';
import { editClassTime, deleteTime } from '../../../lib/writeTodb';
import { Class } from '../../../lib/models/Class';


export default function TimeTableItem(props: { classname: string | string[] | undefined, t: any, uid: string | undefined, classes: Class[] | undefined }) {

    const [ editing, setEditing ] = useState(false);
    const id = props.t.id;
    const [ startTime, setStartTime ] = useState(props.t.startTime);
    const [ endTime, setEndTime ] = useState(props.t.endTime);
    const [ day, setDay ] = useState(props.t.day);
    const [ type, setType ] = useState(props.t.type);
    const [ classroom, setClassroom ] = useState(props.t.classroom);

    const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);

    const submitHandler = () => {
        //check errors

        const timeObject = {
            id, startTime, endTime, day, type, classroom, className: props.classname
        }

        editClassTime(props.uid, props.classes, timeObject, props.classname);
        setEditing(false);
    }

    const deleteHandler = () => {
        deleteTime(props.uid, props.classes, props.classname, id);
    }

    return (
        <Tr>
            <Td>
                <Flex>
                <Editable 
                    defaultValue={props.t.startTime}
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
                    defaultValue={props.t.endTime}
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
                    defaultValue={props.t.day}
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
                    defaultValue={props.t.type}
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
                        defaultValue={props.t.classroom}
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
                    <DeletePopover
                        isDeleteOpen={isDeleteOpen}
                        setIsDeleteOpen={setIsDeleteOpen}
                        deleteHandler={deleteHandler}
                        body="Are you sure you want to delete this class time?" 
                    />
                </Flex>
            </Td>
        </Tr>
    )
}
