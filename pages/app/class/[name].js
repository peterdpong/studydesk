import React from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from "../../../components/app/navbar";
import {
    Heading,
    Box,
    Button,
    Spacer,
    Flex,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import AssignmentTable from "../../../components/app/AssignmentTable";
import AssignmentModal from "../../../components/app/AssignmentModal";
import { useAuth } from '../../../lib/auth';
import firebase from '../../../lib/firebase';
import { FullPageLoading } from '../../../components/FullPageLoading';


const SingleClass = () => {
  const router = useRouter();
  const { name } = router.query;
  const { auth, loading } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();  
  const refToUserData = firebase.firestore().collection("users").doc(auth.uid);

  const deleteHandler = () => {
    if(confirm(`Are you sure you want to delete this class?`)){
        const updatedClasses = auth.classes.filter((c) => c.name !== name);
        refToUserData
            .update({
                classes: updatedClasses
            })
            .catch(
                (err) => console.log(err)
            )
        router.push("/app/");
    }
    else{
        return;
    }
  }

  if(loading){
    return(
        <FullPageLoading/>
      )
  }

  const currentClass = auth.classes.filter((c) => c.name === name);


  return ( 
    <Box>
        <Navbar/>
        <Box ml={10}>
            <Flex mt={5} mb={5}>
                <Link href="/app/">
                    <Button>Back</Button>
                </Link>
                <Spacer/>
                    <Button mr={10} colorScheme="red" onClick={deleteHandler}>Delete Class</Button>
            </Flex>
            
            
            <Heading>{name}</Heading>

            <Button mt={5}>View Syllabus</Button>

            <Box mt={5}>
                <Heading fontSize={20} p={2}>Class times</Heading>
                {currentClass[0].times.map((t) => {
                    return(
                        <Box key={t.id}>
                            <Text fontSize={18} ml={5}>{t.time} {t.day} - {t.type}</Text>
                        </Box>
                    )
                })}
            </Box>

            <Box w="70%">
                <Flex mt={5}>
                    <Box p="2">
                        <Heading size="md">Assignments</Heading>
                    </Box>
                    <Spacer/>
                    <Box mt={3}>
                        <Button colorScheme="teal" onClick={onOpen}>Add</Button>
                        <AssignmentModal isOpen={isOpen} onClose={onClose}/>
                    </Box>
                </Flex>
                <AssignmentTable assignments={currentClass[0].assignments} />
            </Box>
        </Box>
    </Box>
  );
}


 
export default SingleClass;