import React from 'react'
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

export default function CalendarModal(props: {
  isOpen: boolean
  onClose: () => void
  classList: any[]
  assignmentList: any[]
  taskList: any[]
  date: string
  day: string
}) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent maxW={{ base: '90%', md: 'md' }}>
        <ModalHeader>
          {props.date} {props.day}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="xl">Classes: </Text>
          {props.classList.length === 0 ? (
            <Text>No classes on this day!</Text>
          ) : (
            <Box>
              {props.classList.map((c: any) => {
                return (
                  <Box key={c.id}>
                    <Text>
                      {c.startTime}-{c.endTime} - {c.className} ({c.type}) at{' '}
                      {c.classroom}
                    </Text>
                  </Box>
                )
              })}
            </Box>
          )}

          <Text fontSize="xl" mt={5}>
            Assignments:{' '}
          </Text>
          {props.assignmentList.length === 0 ? (
            <Text>No assignments due on this day!</Text>
          ) : (
            <Box>
              {props.assignmentList.map((a: any) => {
                return (
                  <Box key={a.id}>
                    <Text>
                      · {a.name} ({a.className}) - {a.weight}%
                    </Text>
                  </Box>
                )
              })}
            </Box>
          )}

          <Text fontSize="xl" mt={5}>
            Tasks:{' '}
          </Text>
          {props.taskList.length === 0 ? (
            <Text>No tasks due on this day!</Text>
          ) : (
            <Box>
              {props.taskList.map((t: any) => {
                return (
                  <Box key={t.id}>
                    <Text>
                      · {t.name} ({t.className})
                    </Text>
                  </Box>
                )
              })}
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
