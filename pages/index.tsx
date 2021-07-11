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
  HStack
} from '@chakra-ui/react'

import { FcBullish, FcCalendar, FcTodoList } from 'react-icons/fc';
import { BiBookOpen } from "react-icons/bi";
import Navbar from '../components/landing/navbar'
import Footer from '../components/landing/footer'
import Feature from '../components/landing/feature'
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Studydesk</title>
        <meta name="description" content="The ultimate student dashboard." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar/>

        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          flexWrap="nowrap"
          minH="70vh"
          my="5"
        >
          <Stack
            spacing={2}
            w={{ base: "80%", md: "40%" }}
            align={["center", "center", "flex-start", "flex-start"]}
            px={10}
          >
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              color="gray.700"
              textAlign={["center", "center", "left", "left"]}
            >
              Studydesk
            </Heading>
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color="gray.700"
              textAlign={["center", "center", "left", "left"]}
            >
              The ultimate student dashboard.
            </Heading>
            <Text
              fontSize="lg"
              textAlign={["center", "center", "left", "left"]}
            >
              Organize all your classes the way you want it. Track tasks, files, marks and tests all in one place.
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
              textAlign={["center", "center", "left", "left"]}
            >
              <i>Coming soon.</i>
            </Text>

          </Stack>
          <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
            <Image src="/images/placeholder.jpeg" size="100%" rounded="1rem" shadow="xl" />
          </Box>

        </Flex>

        <Box 
          p={10}
        >
          <Heading
            mt={5}
            size={'2xl'}
            textAlign={'center'}
          >
            Built by a students for students.
          </Heading>
          <Text
            mb={8}
            textAlign={'center'}
          >
            Studydesk's features help organize all aspects of school.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} my={'5'}>
            <Feature
              icon={<Icon as={FcTodoList} w={10} h={10} />}
              title={'Organize school tasks'}
              text={
                'All the tasks you need to do in one place, organized by class and priority. Focus on class specific task list or get an overview with a global task list.'
              }
            />
            <Feature
              icon={<Icon as={FcCalendar} w={10} h={10} />}
              title={'Manage your school timetable'}
              text={
                'Input your school timetable and keep track of lectures and tutorials. Plan future timetables with a mock timetable tool.'
              }
            />
            <Feature
              icon={<Icon as={FcBullish} w={10} h={10} />}
              title={'Marks tracking'}
              text={
                'Stop tracking with your marks with a spreadsheet. Check your current average and calculate what your need to get your target grade.'
              }
            />
          </SimpleGrid>
          <Center>
            <Link href="#">
                <Button 
                leftIcon={<BiBookOpen/>} 
                colorScheme="blue" 
                variant="solid"
                >
                  Learn more
                </Button>
            </Link> 
          </Center>

        </Box>


        
        <Box
          p={10}
        >
          <Heading
            my={5}
            size={'2xl'}
            textAlign={'center'}
          >
            How Studydesk can help organize.
          </Heading>
          
          <Center>
            <HStack
              my={'5'}
            >
              <Flex
                w={{base: 16, md: 24}}
                h={{base: 16, md: 24}}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                >
                <Icon as={FcTodoList} w={{base: 10, md: 12}} h={{base: 10, md: 12}} />
              </Flex>
              <Heading
                size={'lg'}
              >
                Global and class focused task lists.
              </Heading>
            </HStack>
          </Center>

          <Center>
            <HStack
              my={'5'}
            >
              <Flex
                w={{base: 16, md: 24}}
                h={{base: 16, md: 24}}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                >
                <Icon as={FcCalendar} w={{base: 10, md: 12}} h={{base: 10, md: 12}} />
              </Flex>
              <Heading
                size={'lg'}
              >
                Load and plan your timetables.
              </Heading>
            </HStack>
          </Center>

          <Center>
            <HStack
              my={'5'}
            >
              <Flex
                w={{base: 16, md: 24}}
                h={{base: 16, md: 24}}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                >
                <Icon as={FcBullish} w={{base: 10, md: 12}} h={{base: 10, md: 12}} />
              </Flex>
              <Heading
                size={'lg'}
              >
                Manage your marks and calculate minimum grades
              </Heading>
            </HStack>
          </Center>

        </Box>

        <Box
          p={10}
          alignContent={'center'}
        >
          <Heading
            size={'2xl'}
            m={5}
            textAlign={'center'}
          >
            Try Studydesk today.
          </Heading>
          <Center>
            <Link href="#">
                <Button 
                rightIcon={<ArrowForwardIcon/>} 
                colorScheme="blue" 
                variant="solid"
                >
                  Sign up.
                </Button>
            </Link> 
          </Center>
          
        </Box>

        <Footer/>

      </main>
      
    </div>
  )
}
