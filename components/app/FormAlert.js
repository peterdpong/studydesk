import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button
} from '@chakra-ui/react';

export default function FormAlert({ onClose, isOpen, text }) {
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
            <AlertDialogHeader>Alert</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                {text}
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={onClose} colorScheme="blue">
                OK
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
