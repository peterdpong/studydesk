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
import { editAssignment } from '../../lib/writeTodb';


export default function AssignmentTableItem({ a, classname, uid, classes }) {

    const [ editing, setEditing ] = useState(false);
    const id = a.id;
    const [ name, setName ] = useState(a.name);
    const [ dueDate, setDueDate ] = useState(a.dueDate);
    const [ weight, setWeight ] = useState(a.weight);

    const submitHandler = () => {

        const assignmentObject = {
            id, name, dueDate, weight
        }

        editAssignment(uid, classes, assignmentObject, classname);
        setEditing(false);
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
                </Flex>
            </Td>
        </Tr>
    )
}
