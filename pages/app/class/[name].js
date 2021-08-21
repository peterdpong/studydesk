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
import ClassTimesTable from "../../../components/app/ClassTimesTable";
import { useAuth } from '../../../lib/auth';
import firebase from '../../../lib/firebase';
import { FullPageLoading } from '../../../components/FullPageLoading';
import ClassTimeModal from '../../../components/app/ClassTimeModal';


const SingleClass = () => {
  const router = useRouter();
  const { name } = router.query;
  const { auth, loading } = useAuth();

  const { isOpen: isAssignmentOpen, onOpen: onAssignmentOpen, onClose: onAssignmentClose } = useDisclosure();  
  const { isOpen: isTimeOpen, onOpen: onTimeOpen, onClose: onTimeClose } = useDisclosure();  

  const refToUsers = firebase.firestore().collection("users");

  const deleteHandler = () => {
    if(confirm(`Are you sure you want to delete this class?`)){
        const updatedClasses = auth.classes.filter((c) => c.name !== name);
        refToUsers
            .doc(auth.uid)
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

            <Box w="50%">
                <Flex mt={10}>
                    <Box p="2">
                        <Heading size="md">Class Times</Heading>
                    </Box>
                    <Spacer/>
                    <Box mt={3}>
                        <Button colorScheme="green" onClick={onTimeOpen}>Add</Button>
                        <ClassTimeModal isOpen={isTimeOpen} onClose={onTimeClose} name={name} uid={auth.uid} classes={auth.classes}/>
                    </Box>
                </Flex>
                <ClassTimesTable times={currentClass[0].times} name={name} uid={auth.uid} classes={auth.classes} />
            </Box>

            <Box w="60%" mb={10}>
                <Flex mt={10}>
                    <Box p="2">
                        <Heading size="md">Assignments</Heading>
                    </Box>
                    <Spacer/>
                    <Box mt={3}>
                        <Button colorScheme="green" onClick={onAssignmentOpen}>Add</Button>
                        <AssignmentModal isOpen={isAssignmentOpen} onClose={onAssignmentClose} name={name} uid={auth.uid} classes={auth.classes} />
                    </Box>
                </Flex>
                <AssignmentTable assignments={currentClass[0].assignments} name={name} uid={auth.uid} classes={auth.classes} />
            </Box>
        </Box>
    </Box>
  );
}

 
export default SingleClass;