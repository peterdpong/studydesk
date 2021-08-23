import React from 'react';
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
    Center
} from '@chakra-ui/react';
import Navbar from '../../../components/app/navbar';
import { useAuth } from '../../../lib/auth';
import { FullPageLoading } from '../../../components/FullPageLoading';

export default function settings() {
    const router = useRouter();
    const { auth, loading } = useAuth();

    if(loading){
        return(
            <FullPageLoading/>
        )
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
                        <Input value={auth.firstName + ' ' + auth.lastName} w="70%" />
                    </Flex>
                </FormControl>

                <FormControl id="school" mt={8}>
                    <Flex justifyContent="flex-end">
                        <FormLabel alignSelf="center" mt={2} mr={5}>School</FormLabel>
                        <Input value={auth.school} w="70%" />
                    </Flex>
                </FormControl>

                <FormControl id="email" mt={8}>
                    <Flex justifyContent="flex-end">
                        <FormLabel alignSelf="center" mt={2} mr={5}>Email</FormLabel>
                        <Input value={auth.email} w="70%" />
                    </Flex>
                </FormControl>
            </Box>
            <Flex mt={10} ml="37%" flexDirection="row">
                <Button alignSelf="center" colorScheme="blue">Update Profile</Button>
                <Button alignSelf="center" colorScheme="red" ml={5}>Change Password</Button>
            </Flex>
        </Box>
    )
}
