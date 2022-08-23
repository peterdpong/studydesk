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

import { ArrowForwardIcon } from '@chakra-ui/icons';
import Hero from '../components/landing/Hero';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

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
        <Hero/>
        
        <Box
          p={10}
        >

          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{base: 1, md: 2}} spacing={10}>
                <Stack>
                  <Flex>
                      <Heading
                        size={'lg'}
                      >
                        Global and class task lists.
                      </Heading>
                  </Flex>
                </Stack>

                <Flex>
                  <Image
                    rounded={'md'}
                    alt={'feature image'}
                    
                  />
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

                    <Heading
                      size={'lg'}
                    >
                      Load and plan your timetables.
                    </Heading>
                </Flex>
              </Stack>
              <Flex>
                <Image
                  rounded={'md'}
                  alt={'feature image'}
                  
                />
              </Flex>
            </SimpleGrid>
          </Container>

          <Container maxW={'7xl'} py={10}>
            <SimpleGrid columns={{base: 1, md: 2}} spacing={10}>
                <Stack>
                  <Flex>
                      <Heading
                        size={'lg'}
                      >
                        Manage your marks and calculate minimum grades.
                      </Heading>
                  </Flex>

                </Stack>

                <Flex>
                  <Image
                    rounded={'md'}
                    alt={'feature image'}

                  />
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

        <Box
          p={10}
          alignContent={'center'}
        >
            <Heading
              fontWeight={700}
              size={'xl'}
              textAlign={'center'}
            >
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
              <Link href="/signup">
                  <Button 
                  rightIcon={<ArrowForwardIcon/>} 
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
