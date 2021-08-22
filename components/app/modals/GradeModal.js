import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box
} from "@chakra-ui/react";


const gradeSelector = (grade) => {
    let gradeAlphabet = '';

    switch (true) {
        case (grade >= 90 && grade <= 100):
            gradeAlphabet = 'A+';
            break;
        case (grade >= 85):
            gradeAlphabet = 'A';
            break;
        case (grade >= 80):
            gradeAlphabet = 'A-';
            break;
        case (grade >= 77):
            gradeAlphabet = 'B+';
            break;
        case (grade >= 73):
            gradeAlphabet = 'B';
            break;
        case (grade >= 70):
            gradeAlphabet = 'B-';
            break;
        case (grade >= 67):
            gradeAlphabet = 'C+';
            break;
        case (grade >= 63):
            gradeAlphabet = 'C';
            break;
        case (grade >= 60):
            gradeAlphabet = 'C-';
            break;
        case (grade >= 57):
            gradeAlphabet = 'D+';
            break;
        case (grade >= 53):
            gradeAlphabet = 'D';
            break;
        case (grade >= 50):
            gradeAlphabet = 'D-';
            break;
        default:
            gradeAlphabet = 'F';
            break;
    }

    return gradeAlphabet;
}


export default function GradeModal({ isOpen, onClose, assignments }) {
    
    const grades = [];
    const reducer = (acc, curr) => acc + curr;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Current Grade</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {assignments.map((a) => {
                    grades.push(0.01 * a.weight * a.grade);
                })}

                <Box fontSize="lg">
                    <Text>Percentage: {grades.reduce(reducer)}%</Text>
                    <Text>Grade: {gradeSelector(grades.reduce(reducer))}</Text>
                </Box>

            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
