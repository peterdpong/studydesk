import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import {
  Flex,
  Stack,
  Heading,
  Button,
  Box,
  Image,
  SimpleGrid,
  Center,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import Hero from '../components/landing/Hero'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import PrimaryButton from '../components/shared/PrimaryButton'

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
        <Hero />

        <Box p={10}>
          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack>
                <Heading size={'lg'}>
                  Keep track of all your classes tasks and deadlines.
                </Heading>
                <Heading fontWeight={500} size={'md'} color={'gray.600'}>
                  See an overview with Unified view or concentrate on a specific
                  class with Focus view.
                </Heading>
              </Stack>

              <Flex>
                <Center>
                  <Image
                    rounded={'md'}
                    width={'400px'}
                    alt={'Image of clipboard icon and checkbox icon'}
                    src="images/landing-1.png"
                  />
                </Center>
              </Flex>
            </SimpleGrid>
          </Container>

          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack>
                <Heading size={'lg'}>Load and plan your timetables.</Heading>

                <Heading fontWeight={500} size={'md'} color={'gray.600'}>
                  Share your timetables and see which classes you are taking
                  with your friends with overlap mode.
                </Heading>
              </Stack>
              <Flex>
                <Center>
                  <Image
                    rounded={'md'}
                    width={'400px'}
                    alt={'Image of calendar icon and pencil icon'}
                    src="/images/landing-2.png"
                  />
                </Center>
              </Flex>
            </SimpleGrid>
          </Container>

          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack>
                <Heading size={'lg'}>Manage and track your marks.</Heading>
                <Heading fontWeight={500} size={'md'} color={'gray.600'}>
                  See how you are doing in your classes. See your current
                  average and calculate what marks you need to reach a certain
                  mark.
                </Heading>
              </Stack>

              <Flex>
                <Center>
                  <Image
                    rounded={'md'}
                    width={'400px'}
                    alt={'Image of icons of a list and mark tracking'}
                    src="images/landing-3.png"
                  />
                </Center>
              </Flex>
            </SimpleGrid>
          </Container>
        </Box>

        <Box p={10} alignContent={'center'}>
          <Heading fontWeight={700} size={'xl'} textAlign={'center'}>
            Try Studydesk today.
          </Heading>
          <Heading
            fontWeight={500}
            size={'md'}
            mb={5}
            textAlign={'center'}
            color={'gray.600'}
          >
            Start organizing your studying all in one place.
          </Heading>

          <Center>
            <VStack>
              <Heading
                fontWeight={500}
                fontSize={{ base: 'xl', sm: 'md', md: 'lg' }}
                maxW={'3xl'}
              >
                Coming soon. Be the first to try it.
              </Heading>
              <InputGroup maxW={'md'} size="md">
                <Input placeholder="Email" />
                <InputRightElement width="6rem">
                  <PrimaryButton text={'Subscribe'} />
                </InputRightElement>
              </InputGroup>
            </VStack>
            {/* <Link href="/signup">
              <PrimaryButton
                text={'Sign up'}
                rightIcon={<ArrowForwardIcon />}
              />
            </Link> */}
          </Center>
        </Box>

        <Footer />
      </main>
    </div>
  )
}
