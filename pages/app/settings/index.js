import React, { useEffect, useState } from 'react';
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
    useDisclosure,
    useSafeLayoutEffect
} from '@chakra-ui/react';
import Navbar from '../../../components/app/navbar';
import { useAuth } from '../../../lib/auth';
import { FullPageLoading } from '../../../components/FullPageLoading';
import { updateUserProfile } from '../../../lib/writeTodb';
import EmailPasswordModal from '../../../components/app/modals/EmailPasswordModal';
import FormAlert from '../../../components/app/FormAlert';
import useFirstRender from '../../../components/app/useFirstRender';


export default function settings() {
    const router = useRouter();
    const { signinWithEmailAndPassword, signinWithGoogle, auth, loading } = useAuth();
    const firstRender = useFirstRender();

    const [ username, setUsername ] = useState('');
    const [ school, setSchool ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();


    useEffect(() => {
        if(auth){
            setUsername(auth.firstName + ' ' + auth.lastName);
            setSchool(auth.school);
            setEmail(auth.email);
        }
    }, [auth])

    useEffect(() => {
        if(!firstRender){
            onAlertOpen();
        }
    }, [alertMessage])
    
    if(loading){
        return(
            <FullPageLoading/>
        )
    }

    const updateProfile = async (emailOnly) => {
        
        let emailChange = false;

        if(authenticated){
            if(email.length === 0){
                setAlertMessage('Please enter an email');
                return;
            }
            
            if(!emailOnly && password.length === 0){
                setAlertMessage('Please enter a password');
                return;
            }

            emailChange = true;
        }
        else{
            if(username.length === 0){
                setAlertMessage('Please enter a username');
                return;
            }

            if(school.length === 0){
                setAlertMessage('Please enter a school');
                return;
            }
        }

        const profileObject = {
            username, school, email, password, emailChange, emailOnly
        }

        const response = await updateUserProfile(auth.uid, profileObject);

        if(response === 'No error'){
            if(authenticated){
                setAuthenticated(false);
                setPassword('');
            }
            
            setError('');
        }
        else{
            setError(response);
        }
        
        setAlertMessage('User Profile Updated Successfully!');
    }

    return (
        <Box>
            <Navbar/>
            <Heading textAlign="center" mt={4}>Settings</Heading>
            <Button onClick={() => router.push('/app')} ml={{md: 10, base: 4}} mt={4} colorScheme="teal">
                Back
            </Button>
            <Box w={{md: "40%", base: "95%"}} ml={{md: "25%", base: "0%"}} mt={8}>
                {authenticated ? 
                <Box>
                    <FormControl id="email" mt={8}>
                    <Flex justifyContent="flex-end">
                        <FormLabel alignSelf="center" mt={2} mr={5}>Email</FormLabel>
                        <Input value={email} w="70%" onChange={(e) => setEmail(e.target.value)} />
                    </Flex>
                    </FormControl>
                    <FormControl id="password" mt={8}>
                        <Flex justifyContent="flex-end">
                            <FormLabel alignSelf="center" mt={2} mr={5}>Password</FormLabel>
                            <Input value={password} w="70%" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Flex>
                    </FormControl>
                </Box>
                :
                <Box>
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
                    <Box mt={8} textAlign="center" ml={{md: "30%", base: "5%"}}>
                        <Text fontSize={15}>Please click the Authenticate Button below to modify your email or password</Text>
                    </Box>
                </Box>
                }
            </Box>

            <FormAlert onClose={onAlertClose} isOpen={isAlertOpen} text={alertMessage} />

            <Flex mt={10} justifyContent="center" flexDirection="row">
                {!authenticated ?
                <Flex>
                    <Button alignSelf="center" variant="outline" colorScheme="blue" onClick={() => updateProfile(false)}>Update Profile</Button>
                    <Button alignSelf="center" variant="outline" colorScheme="red" onClick={onOpen} ml={5}>Authenticate</Button>
                </Flex>
                :
                <Flex>
                    <Button alignSelf="center" variant="outline" colorScheme="blue" onClick={() => updateProfile(true)}>Change Email Only</Button>
                    <Button alignSelf="center" variant="outline" colorScheme="red" onClick={() => updateProfile(false)} ml={5}>Update Both</Button>
                </Flex>
                }
                <EmailPasswordModal isOpen={isOpen} onClose={onClose} setAuthenticated={setAuthenticated} emailPassword={signinWithEmailAndPassword} google={signinWithGoogle} setError={setError} />
            </Flex>
            
            <Text mt={5} textAlign="center">{error}</Text>
        </Box>
    )
}