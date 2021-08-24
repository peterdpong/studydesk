import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Flex,
    Text,
    Button,
    Heading,
    FormControl,
    Input,
    FormLabel,
    useDisclosure
} from '@chakra-ui/react';
import Navbar from '../../../components/app/navbar';
import { useAuth } from '../../../lib/auth';
import { FullPageLoading } from '../../../components/FullPageLoading';
import { updateUserProfile } from '../../../lib/writeTodb';
import PasswordModal from '../../../components/app/modals/PasswordModal';

export default function settings() {
    const router = useRouter();
    const { auth, loading } = useAuth();
    
    if(loading){
        return(
            <FullPageLoading/>
        )
    }

    console.log(auth);

    const [ username, setUsername ] = useState(auth.firstName + ' ' + auth.lastName);
    const [ school, setSchool ] = useState(auth.school);
    const [ email, setEmail ] = useState(auth.email);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const updateProfile = () => {
        
        let emailChange = false;

        if(username.length === 0){
            alert('Please enter a username');
            return;
        }

        if(school.length === 0){
            alert('Please enter a school');
            return;
        }

        if(email.length === 0){
            alert('Please enter an email');
            return;
        }

        if(email !== auth.email){
            emailChange = true;
        }

        const profileObject = {
            username, school, email, emailChange
        }

        updateUserProfile(auth.uid, profileObject);
    }

    return (
        <Box>
            <Navbar/>
            <Heading textAlign="center" mt={4}>Settings</Heading>
            <Button onClick={() => router.push('/app')} ml={10} mt={4} colorScheme="teal">
                Back to dashboard
            </Button>
            <Box w="40%" ml="25%" mt={8}>
                <FormControl id="username">
                    <Flex justifyContent="flex-end">
                        <FormLabel alignSelf="center" mt={2} mr={5}>Username</FormLabel>
                        <Input value={username} w="70%" onChange={(e) => setUsername(e.target.value)} />
                    </Flex>
                </FormControl>

                <FormControl id="school" mt={8}>
                    <Flex justifyContent="flex-end">
                        <FormLabel alignSelf="center" mt={2} mr={5}>School</FormLabel>
                        <Input value={school} w="70%" onChange={(e) => setSchool(e.target.value)} />
                    </Flex>
                </FormControl>

                <FormControl id="email" mt={8}>
                    <Flex justifyContent="flex-end">
                        <FormLabel alignSelf="center" mt={2} mr={5}>Email</FormLabel>
                        <Input value={email} w="70%" onChange={(e) => setEmail(e.target.value)} />
                    </Flex>
                </FormControl>
            </Box>
            <Flex mt={10} ml="37%" flexDirection="row">
                <Button alignSelf="center" variant="outline" colorScheme="blue" onClick={updateProfile}>Update Profile</Button>
                <Button alignSelf="center" variant="outline" colorScheme="red" onClick={onOpen} ml={5}>Change Password</Button>
                <PasswordModal isOpen={isOpen} onClose={onClose} />
            </Flex>
        </Box>
    )
}
