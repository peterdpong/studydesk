import React, { RefObject } from 'react';
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

export default function FormAlert(props: { onClose: () => void, isOpen: boolean, text: string }) {
    const cancelRef: RefObject<any> | undefined = React.useRef();

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={props.onClose}
            isOpen={props.isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
            <AlertDialogHeader>Alert</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                {props.text}
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={props.onClose} colorScheme="blue">
                OK
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
