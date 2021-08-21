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
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    ButtonGroup
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { editAssignment, deleteAssignment } from '../../../lib/writeTodb';


export default function AssignmentTableItem({ a, classname, uid, classes }) {

    const [ editing, setEditing ] = useState(false);
    const id = a.id;
    const [ name, setName ] = useState(a.name);
    const [ dueDate, setDueDate ] = useState(a.dueDate);
    const [ weight, setWeight ] = useState(a.weight);

    const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);

    const submitHandler = () => {

        const assignmentObject = {
            id, name, dueDate, weight
        }

        editAssignment(uid, classes, assignmentObject, classname);
        setEditing(false);
    }

    const deleteHandler = () => {
        deleteAssignment(uid, classes, classname, id);
    }

    return (
        <Tr key={a.id}>
            <Td>
                <Editable 
                    defaultValue={a.name}
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
                    defaultValue={a.dueDate}
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
                        defaultValue={a.weight}
                        onEdit={() => setEditing(true)}
                        onCancel={() => setEditing(false)}
                        onChange={(e) => setWeight(e)}
                        onSubmit={submitHandler}>
                        <EditablePreview />
                        <EditableInput />
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
                    <Popover
                        returnFocusOnClose={false}
                        isOpen={isDeleteOpen}
                        onClose={() => setIsDeleteOpen(false)}
                        placement="right"
                        closeOnBlur={false}
                    >
                        <PopoverTrigger>
                            <IconButton
                                variant="ghost"
                                colorScheme="red"
                                aria-label="Send email"
                                icon={<DeleteIcon />}
                                size="md"
                                _hover={{
                                    background: "red",
                                    color: "white"
                                }}
                                onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            Are you sure you want to delete this class time?
                        </PopoverBody>
                        <PopoverFooter d="flex" justifyContent="flex-end">
                            <ButtonGroup size="sm">
                            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                            <Button colorScheme="red" onClick={deleteHandler}>Delete</Button>
                            </ButtonGroup>
                        </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Td>
        </Tr>
    )
}
