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
import { ClassModel } from '../../../lib/models/ClassModel';
import { ClassTimes } from '../../../lib/models/ClassTimes';
import { editClassTime, deleteClassTime } from '../../../lib/db-actions/ClassActions';


export default function TimeTableItem(props: { key: number, classname: string | undefined, t: ClassTimes, uid: string | undefined, classes: ClassModel[] | undefined }) {

    const [ editing, setEditing ] = useState(false);
    const [ startTime, setStartTime ] = useState(props.t.startTime);
    const [ endTime, setEndTime ] = useState(props.t.endTime);
    const [ day, setDay ] = useState(props.t.day);
    const [ type, setType ] = useState(props.t.type);
    const [ classRoom, setClassRoom ] = useState(props.t.classRoom);

    const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);

    const submitHandler = () => {
        // TODO: Check errors

        const timeObject: ClassTimes = {
            startTime, endTime, day, type, classRoom, className: props.classname ? props.classname : ""
        }

        // TODO: Check undefined
        editClassTime(props.uid, props.classes!, timeObject, props.classname ? props.classname : "", props.key);
        setEditing(false);
    }

    const deleteHandler = () => {
      deleteClassTime(props.uid, props.classes!, props.classname ? props.classname : "", props.key);
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
                    defaultValue={props.t.type.toString()}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    // TODO: Create string to ClassTypes
                    //onChange={(e) => setType(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Td>
            <Td>
                <Flex align="center">
                    <Editable 
                        defaultValue={props.t.classRoom}
                        onEdit={() => setEditing(true)}
                        onCancel={() => setEditing(false)}
                        onChange={(e) => setClassRoom(e)}
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
