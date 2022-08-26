import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import {
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Box,
  Image,
  SimpleGrid,
  Icon,
  Center,
  Container,
} from '@chakra-ui/react'

import { IoAnalytics, IoCalendarClear, IoList } from 'react-icons/io5'
import Navbar from '../components/landing/navbar'
import Footer from '../components/landing/footer'
import Feature from '../components/landing/feature'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Studydesk</title>
        <meta name="description" content="The ultimate student dashboard." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />

        <Flex
          align="center"
          justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
          direction={{ base: 'column-reverse', md: 'row' }}
          flexWrap="nowrap"
          minH="70vh"
          my="5"
        >
          <Stack
            spacing={2}
            w={{ base: '80%', md: '40%' }}
            align={['center', 'center', 'flex-start', 'flex-start']}
            px={10}
          >
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              color="gray.700"
              textAlign={['center', 'center', 'left', 'left']}
            >
              Studydesk
            </Heading>
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color="gray.700"
              textAlign={['center', 'center', 'left', 'left']}
            >
              The ultimate student dashboard.
            </Heading>
            <Text
              fontSize="lg"
              textAlign={['center', 'center', 'left', 'left']}
            >
              Organize all your classes the way you want it. Track tasks, files,
              marks and tests all in one place.
            </Text>
            {/* <Link href="#">
              <Button 
              rightIcon={<ArrowForwardIcon/>} 
              colorScheme="blue" 
              variant="solid"
              >
                Try it
              </Button>
            </Link> */}
            <Text
              fontSize="xl"
              textAlign={['center', 'center', 'left', 'left']}
            >
              <i>Coming soon.</i>
            </Text>
          </Stack>
          <Box
            w={{ base: '80%', sm: '60%', md: '50%' }}
            mb={{ base: 12, md: 0 }}
          >
            <Image
              src="/images/placeholder.jpeg"
              sizes="100%"
              rounded="1rem"
              shadow="xl"
            />
          </Box>
        </Flex>

        <Box p={10}>
          <Heading mt={5} size={'2xl'} textAlign={'center'}>
            Built by a students for students.
          </Heading>
          <Text mb={8} textAlign={'center'}>
            Studydesk&apos;s features help organize all aspects of school.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} my={'5'}>
            <Feature
              icon={<Icon as={IoList} w={10} h={10} color="gray.600" />}
              title={'Organize school tasks'}
              text={
                'All the tasks you need to do in one place, organized by class and priority. Focus on class specific task list or get an overview with a global task list.'
              }
            />
            <Feature
              icon={
                <Icon as={IoCalendarClear} w={10} h={10} color="gray.600" />
              }
              title={'Manage your school timetable'}
              text={
                'Input your school timetable and keep track of lectures and tutorials. Plan future timetables with a mock timetable tool.'
              }
            />
            <Feature
              icon={<Icon as={IoAnalytics} w={10} h={10} color="gray.600" />}
              title={'Marks tracking'}
              text={
                'Stop tracking with your marks with a spreadsheet. Check your current average and calculate what your need to get your target grade.'
              }
            />
          </SimpleGrid>
          <Center>
            <Link href="#">
              <Button colorScheme="blue" variant="solid">
                Learn more
              </Button>
            </Link>
          </Center>
        </Box>

        <Box p={10}>
          <Heading my={5} size={'2xl'} textAlign={'center'}>
            How Studydesk can help organize.
          </Heading>

          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack>
                <Flex>
                  <Flex
                    w={20}
                    h={20}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={'gray.100'}
                    mb={1}
                    mx={2}
                  >
                    <Icon as={IoList} w={12} h={12} color="gray.600" />
                  </Flex>
                  <Center flex={1}>
                    <Heading size={'lg'}>
                      Global and class focused task lists.
                    </Heading>
                  </Center>
                </Flex>
              </Stack>

              <Flex>
                <Image
                  rounded={'md'}
                  alt={'feature image'}
                  src={
                    'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                  }
                />
              </Flex>
            </SimpleGrid>
          </Container>

          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack>
                <Flex>
                  <Flex
                    w={20}
                    h={20}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={'gray.100'}
                    mb={1}
                    mx={2}
                  >
                    <Icon as={IoCalendarClear} w={12} h={12} color="gray.600" />
                  </Flex>
                  <Center flex={1}>
                    <Heading size={'lg'}>
                      Load and plan your timetables.
                    </Heading>
                  </Center>
                </Flex>
              </Stack>
              <Flex>
                <Image
                  rounded={'md'}
                  alt={'feature image'}
                  src={
                    'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                  }
                />
              </Flex>
            </SimpleGrid>
          </Container>

          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack>
                <Flex>
                  <Flex
                    w={20}
                    h={20}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={'gray.100'}
                    mb={1}
                    mx={2}
                  >
                    <Icon as={IoAnalytics} w={12} h={12} color="gray.600" />
                  </Flex>
                  <Center flex={1}>
                    <Heading size={'lg'}>
                      Manage your marks and calculate minimum grades.
                    </Heading>
                  </Center>
                </Flex>
              </Stack>

              <Flex>
                <Image
                  rounded={'md'}
                  alt={'feature image'}
                  src={
                    'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                  }
                />
              </Flex>
            </SimpleGrid>
          </Container>
        </Box>
        <Box alignContent={'center'}>
          <Heading size={'xl'} m={5} textAlign={'center'}>
            100% free and no advertising.
          </Heading>
          <Heading size={'md'} m={5} textAlign={'center'} fontWeight="semibold">
            Studydesk will always be available for free and have no advertising.{' '}
            <br />
            We plan to provide extra features for a small additional cost to
            cover costs.
          </Heading>
        </Box>

        <Box p={10} alignContent={'center'}>
          <Heading size={'2xl'} m={5} textAlign={'center'}>
            Try Studydesk today.
          </Heading>
          <Center>
            <Link href="/signup">
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="blue"
                variant="solid"
              >
                Sign up
              </Button>
            </Link>
          </Center>
        </Box>

        <Footer />
      </main>
    </div>
  )
}
