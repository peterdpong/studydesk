import React, { useState } from 'react';
import {
    Box,
    Text,
    Flex,
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
    Input
} from "@chakra-ui/react";
import { newFile } from '../../../lib/writeTodb';


export default function SyllabusModal({ isOpen, onClose }) {

    const [ fileURL, setFileURL ] = useState('');

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const newFileURL = await newFile(file);
        setFileURL(newFileURL);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(fileURL.length === 0){
            alert('Please choose a file');
        }

        // console.log(fileURL);
        // add to user profile

        setFileURL('');
        onClose();
    }


    const closeHandler = () => {
        if(fileURL.length === 0){
            setFileURL('');
            onClose();
            return;
        }
        else{
            // delete from storage
            console.log('delete from storage');
            setFileURL('');
            onClose();
            return;
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay />
            <ModalContent maxW={{base: "90%", md: "md"}}>
            <ModalHeader>Upload your syllabus</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl id="syllabus-upload" isRequired>
                    <FormLabel>Choose file(PDF)</FormLabel>
                    <Input type="file" onChange={onFileChange} />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Flex>
                    <Button colorScheme="blue" mr={3} onClick={submitHandler}>
                    Submit
                    </Button>
                    <Button colorScheme="red" mr={3} onClick={closeHandler}>
                    Cancel
                    </Button>
                </Flex>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
