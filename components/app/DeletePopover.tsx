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

export default function DeletePopover(props: { isDeleteOpen: boolean, setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>, deleteHandler: () => void, body: string }) {
    return (
        <Popover
            returnFocusOnClose={false}
            isOpen={props.isDeleteOpen}
            onClose={() => props.setIsDeleteOpen(false)}
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
                    onClick={() => props.setIsDeleteOpen(!props.isDeleteOpen)}
                />
            </PopoverTrigger>
            <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
                {props.body}
            </PopoverBody>
            <PopoverFooter justifyContent="flex-end">
                <ButtonGroup size="sm">
                <Button variant="outline" onClick={() => props.setIsDeleteOpen(false)}>Cancel</Button>
                <Button colorScheme="red" onClick={props.deleteHandler}>Delete</Button>
                </ButtonGroup>
            </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
}
