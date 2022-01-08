import React, { useState } from 'react';
import {
    Tr,
    Td,
    IconButton,
    Flex, 
    Spacer,
    Editable, 
    EditableInput,
    EditablePreview
} from "@chakra-ui/react";
import DeletePopover from '../DeletePopover';
import { CheckIcon } from '@chakra-ui/icons';
import { editAssignment, deleteAssignment } from '../../../lib/writeTodb';
import { Class } from '../../../lib/models/Class';


export default function AssignmentTableItem(props: { a: any, classname: string | string[] | undefined, uid: string | undefined, classes: Class[] | undefined }) {

    const [ editing, setEditing ] = useState(false);
    const id = props.a.id;
    const [ name, setName ] = useState(props.a.name);
    const [ dueDate, setDueDate ] = useState(props.a.dueDate);
    const [ weight, setWeight ] = useState(props.a.weight);
    const [ grade, setGrade ] = useState(props.a.grade);

    const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);

    const submitHandler = () => {

        //check for error
        
        const assignmentObject = {
            id, name, dueDate, weight, grade
        }

        editAssignment(props.uid, props.classes, assignmentObject, props.classname);
        setEditing(false);
    }

    const deleteHandler = () => {
        deleteAssignment(props.uid, props.classes, props.classname, id);
    }

    return (
        <Tr key={props.a.id}>
            <Td>
                <Editable 
                    defaultValue={props.a.name}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    onChange={(e) => setName(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Td>
            <Td>
                <Editable 
                    defaultValue={props.a.dueDate}
                    onEdit={() => setEditing(true)}
                    onCancel={() => setEditing(false)}
                    onChange={(e) => setDueDate(e)}
                    onSubmit={submitHandler}>
                    <EditablePreview />
                    <EditableInput type="date" />
                </Editable>
            </Td>
            <Td>
                <Flex align="center">
                    <Editable 
                        defaultValue={props.a.weight}
                        onEdit={() => setEditing(true)}
                        onCancel={() => setEditing(false)}
                        onChange={(e) => setWeight(e)}
                        onSubmit={submitHandler}>
                        <EditablePreview />
                        <EditableInput type="number" />
                    </Editable>
                    %
                </Flex>
            </Td>
            <Td>
                <Flex align="center">
                    <Editable 
                        defaultValue={props.a.grade}
                        onEdit={() => setEditing(true)}
                        onCancel={() => setEditing(false)}
                        onChange={(e) => setGrade(e)}
                        onSubmit={submitHandler}>
                        <EditablePreview />
                        <EditableInput type="number" />
                    </Editable>
                    %
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
                        body="Are you sure you want to delete this assignment?" 
                    />
                </Flex>
            </Td>
        </Tr>
    )
}
