import React from "react";
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
import Link from 'next/link';



const singleClass = {
    name: "ECE302",
    times: [
        {
            id: 1,
            time: "9:00-10:00",
            day: "Mon",
            type: "Lecture"
        },
        {
            id: 2,
            time: "13:00-14:00",
            day: "Wed",
            type: "Tutorial"
        },
        {
            id: 3,
            time: "16:00-18:00",
            day: "Thu",
            type: "Practical"
        },
    ],
    assignments: [
        {
            name: "Default",
            dueDate: "09/16/2021",
            weight: 10
        },
        {
            name: "Default2",
            dueDate: "09/16/2021",
            weight: 20
        }
    ]
}

const SingleClass = () => {
    const path = window.location.pathname;
    const currentClassPath = path.split("class/");
    const currentClass = currentClassPath[1];
    //console.log(currentClass);

    //query by currentClass to get data
    /*
    const refToClassList = db.collection("classes");
    const query = refToClassList.where("name", "==", name)
    */

    const { isOpen, onOpen, onClose } = useDisclosure();


    return ( 
        <Box>
            <Navbar/>
            <Box ml={10}>
                <Link href="/app/">
                    <Button mt={5} mb={5}>Back</Button>
                </Link>
                
                <Heading>{currentClass}</Heading>

                <Button mt={5}>View Syllabus</Button>

                <Box mt={5}>
                    <Heading fontSize={20} p={2}>Class times</Heading>
                    {singleClass.times.map((t) => {
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
                    <AssignmentTable assignments={singleClass.assignments} />
                </Box>
            </Box>
        </Box>
    );
}


 
export default SingleClass;