import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Heading,
  Box,
  Button,
  Spacer,
  Flex,
  useDisclosure,
  Center,
  Link,
} from '@chakra-ui/react'
import AssignmentTable from '../../../components/app/tables/AssignmentTable'
import AssignmentModal from '../../../components/app/modals/AssignmentModal'
import ClassTimesTable from '../../../components/app/tables/ClassTimesTable'
import { useAuth } from '../../../lib/auth'
import { FullPageLoading } from '../../../components/FullPageLoading'
import ClassTimeModal from '../../../components/app/modals/ClassTimeModal'
import GradeModal from '../../../components/app/modals/GradeModal'
import SyllabusModal from '../../../components/app/modals/SyllabusModal'
import DeletePopover from '../../../components/app/DeletePopover'
import { protectedRoute } from '../../../lib/hoc/protectedRoute'
import { ClassModel } from '../../../lib/models/ClassModel'
import { deleteClass } from '../../../lib/db-actions/ClassActions'
import { deleteFile, deleteSyllabus } from '../../../lib/db-actions/FileActions'
import Sidebar from '../../../components/app/Sidebar'

const SingleClass = () => {
  const router = useRouter()
  const { name } = router.query
  const { useRequiredAuth, loading } = useAuth()
  const [currentClass, setCurrentClass] = useState<ClassModel[] | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const auth = useRequiredAuth()

  const {
    isOpen: isAssignmentOpen,
    onOpen: onAssignmentOpen,
    onClose: onAssignmentClose,
  } = useDisclosure()
  const {
    isOpen: isTimeOpen,
    onOpen: onTimeOpen,
    onClose: onTimeClose,
  } = useDisclosure()
  const {
    isOpen: isGradeOpen,
    onOpen: onGradeOpen,
    onClose: onGradeClose,
  } = useDisclosure()
  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
  } = useDisclosure()

  let className: string | undefined
  if (Array.isArray(name)) {
    className = name[0]
  } else {
    className = name
  }

  const deleteHandler = async () => {
    if (confirm(`Are you sure you want to delete this class?`)) {
      router.push('/app/')
      await deleteClass(auth?.uid, auth?.classes!, className ? className : '')
    } else {
      return
    }
  }

  useEffect(() => {
    if (auth) {
      setCurrentClass(auth.classes!.filter((c) => c.name === name))
    }
  }, [auth, name])

  if (loading || currentClass === null) {
    return <FullPageLoading />
  }

  return (
    <Sidebar>
      <Box>
        <Box ml={{ md: 10, base: 2 }}>
          <Flex mt={5} mb={5}>
            <NextLink href="/app/">
              <Button>Back</Button>
            </NextLink>
            <Spacer />
            <Button
              mr={{ base: 2, md: 10 }}
              colorScheme="red"
              onClick={deleteHandler}
            >
              Delete Class
            </Button>
          </Flex>

          <Heading>{name}</Heading>

          <Flex mt={5} align="center">
            {currentClass[0].syllabus ? (
              <Flex>
                <Link href={currentClass[0].syllabus} isExternal>
                  <Button mr={2}>View Syllabus</Button>
                </Link>

                <DeletePopover
                  isDeleteOpen={isDeleteOpen}
                  setIsDeleteOpen={setIsDeleteOpen}
                  deleteHandler={() => {
                    deleteFile(currentClass[0].syllabus)
                    deleteSyllabus(
                      auth!.uid,
                      auth!.classes!,
                      className ? className : ''
                    )
                  }}
                  body="Are you sure you want to delete the syllabus?"
                />
              </Flex>
            ) : (
              <Button onClick={onUploadOpen}>Upload Syllabus</Button>
            )}
            <SyllabusModal
              isOpen={isUploadOpen}
              onClose={onUploadClose}
              name={className}
              uid={auth!.uid}
              classes={auth!.classes}
            />
          </Flex>

          <Box w={{ md: '50%', sm: '70%', base: '100%' }}>
            <Flex mt={10}>
              <Box p="2">
                <Heading size="md">Class Times</Heading>
              </Box>
              <Spacer />
              <Box mt={3}>
                <Button
                  colorScheme="green"
                  onClick={onTimeOpen}
                  mr={{ base: 2, md: 0 }}
                >
                  Add
                </Button>
                <ClassTimeModal
                  isOpen={isTimeOpen}
                  onClose={onTimeClose}
                  name={className}
                  uid={auth!.uid}
                  classes={auth!.classes}
                />
              </Box>
            </Flex>
            <Box
              overflowX={{ base: 'auto', sm: 'initial' }}
              w={{ base: '90%', md: '100%' }}
            >
              <ClassTimesTable
                times={currentClass[0].classTimes}
                name={className}
                uid={auth!.uid}
                classes={auth!.classes}
              />
            </Box>
          </Box>

          <Box w={{ md: '60%', sm: '80%' }} mb={10}>
            <Flex mt={10}>
              <Box p="2">
                <Heading size="md">Assignments</Heading>
              </Box>
              <Spacer />
              <Box mt={3}>
                <Button
                  colorScheme="green"
                  onClick={onAssignmentOpen}
                  mr={{ base: 2, md: 0 }}
                >
                  Add
                </Button>
                <AssignmentModal
                  isOpen={isAssignmentOpen}
                  onClose={onAssignmentClose}
                  name={className}
                  uid={auth!.uid}
                  classes={auth!.classes}
                />
              </Box>
            </Flex>
            <Box
              overflowX={{ base: 'auto', sm: 'initial' }}
              w={{ base: '90%', md: '100%' }}
            >
              <AssignmentTable
                assignments={currentClass[0].assignments}
                name={className}
                uid={auth!.uid}
                classes={auth!.classes}
              />
            </Box>
            <Center>
              <Button mt={5} colorScheme="red" onClick={onGradeOpen}>
                Calculate Grade
              </Button>
              <GradeModal
                isOpen={isGradeOpen}
                onClose={onGradeClose}
                assignments={currentClass[0].assignments}
              />
            </Center>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  )
}

export default protectedRoute(SingleClass)
