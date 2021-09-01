import React from 'react';
import {
    IconButton,
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
import { DeleteIcon } from '@chakra-ui/icons';

export default function DeletePopover({ isDeleteOpen, setIsDeleteOpen, deleteHandler, body }) {
    return (
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
                {body}
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                <Button colorScheme="red" onClick={deleteHandler}>Delete</Button>
                </ButtonGroup>
            </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
}
