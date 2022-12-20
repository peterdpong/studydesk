import React, { useState } from 'react'
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
  Input,
} from '@chakra-ui/react'
import { ClassModel } from '../../../lib/models/ClassModel'
import {
  addSyllabus,
  deleteFile,
  newFile,
} from '../../../lib/db-actions/FileActions'

export default function SyllabusModal(props: {
  isOpen: boolean
  onClose: () => void
  name: string | undefined
  uid: string | undefined
  classes: ClassModel[] | undefined
}) {
  const [fileURL, setFileURL] = useState('')

  const onFileChange = async (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const newFileURL = await newFile(file)
      setFileURL(newFileURL)
    } else {
      return
    }
  }

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (fileURL.length === 0) {
      alert('Please choose a file')
    }

    addSyllabus(
      props.uid,
      fileURL,
      props.classes!,
      props.name ? props.name : ''
    )
    setFileURL('')
    props.onClose()
  }

  const closeHandler = async () => {
    if (fileURL.length === 0) {
      setFileURL('')
      props.onClose()
      return
    } else {
      const response = await deleteFile(fileURL)

      if (response.length !== 0) {
        console.log(response)
      }

      setFileURL('')
      props.onClose()
      return
    }
  }

  return (
    <Modal isOpen={props.isOpen} onClose={closeHandler}>
      <ModalOverlay />
      <ModalContent maxW={{ base: '90%', md: 'md' }}>
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
