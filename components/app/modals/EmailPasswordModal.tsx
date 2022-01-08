import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack
} from "@chakra-ui/react";
import { addClass } from '../../../lib/writeTodb';
import { FaGoogle } from "react-icons/fa";
import { TextWithDivider } from "../../forms/TextWithDivider";



export default function EmailPasswordModal(props: { 
    isOpen: boolean, 
    onClose: () => void, 
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>, 
    emailPassword: (email: string, password: string) => Promise<any>, 
    google: () => Promise<void>, 
    setError: React.Dispatch<React.SetStateAction<string | undefined>> 
}) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const emailPasswordSignIn = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.setError(undefined);

        props.emailPassword(email, password)
            .then(() => {
                props.setAuthenticated(true);
            })
            .catch(error => {
                props.setError(error.message);
            });
        
        props.onClose();
    }

    const googleSignIn = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.setError(undefined);

        props.google()
            .then(() => {
                props.setAuthenticated(true);
            })
            .catch(error => {
                props.setError(error.message);
            });
        
        props.onClose();
    }


    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Re-Login to modify Email or Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                </FormControl>
                <FormControl id="password" mt={6} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>
                <TextWithDivider my="6">or</TextWithDivider>
                <Stack>
                    <Button onClick={googleSignIn} type="submit" colorScheme="blue" size="lg" fontSize="md" color="currentColor" variant="outline" leftIcon={<FaGoogle/>}>
                        Sign in with Google
                    </Button>
                </Stack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={emailPasswordSignIn}>
                Authenticate
                </Button>
                <Button colorScheme="blue" variant="outline" mr={3} onClick={props.onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
