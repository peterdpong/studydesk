import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Flex, 
    Spacer,
    useDisclosure
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
import EditClassTimeModal from './EditClassTimeModal';


export default function ClassTimesTable({ times }) {

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Time</Th>
                    <Th>Day</Th>
                    <Th>Type</Th>
                    <Th>Classroom</Th>
                </Tr>
            </Thead>
            <Tbody>
                {times.map((t) => {
                    const { isOpen, onOpen, onClose } = useDisclosure();  
                    
                    return(
                        <Tr key={t.id}>
                            <Td>{t.time}</Td>
                            <Td>{t.day}</Td>
                            <Td>{t.type}</Td>
                            <Td>
                                <Flex align="center">
                                    {t.classroom}
                                    <Spacer/>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="blue"
                                        aria-label="Send email"
                                        icon={<EditIcon />}
                                        size="lg"
                                        _hover={{
                                            background: "blue.500",
                                            color: "white"
                                        }}
                                        onClick={onOpen}
                                    />
                                    <EditClassTimeModal timeObject={t} isOpen={isOpen} onClose={onClose}/>
                                </Flex>
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}
