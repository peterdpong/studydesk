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



export default function EmailPasswordModal({ isOpen, onClose, setAuthenticated, emailPassword, google, setError }) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const emailPasswordSignIn = (e) => {
        e.preventDefault();
        setError(null);

        emailPassword(email, password)
            .then(() => {
                setAuthenticated(true);
            })
            .catch(error => {
                setError(error.message);
            });
        
        onClose();
    }

    const googleSignIn = (e) => {
        e.preventDefault();
        setError(null);

        google()
            .then(() => {
                setAuthenticated(true);
            })
            .catch(error => {
                setError(error.message);
            });
        
        onClose();
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
