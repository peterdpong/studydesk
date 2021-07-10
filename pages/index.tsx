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
  Image
} from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Studydesk</title>
        <meta name="description" content="The ultimate student dashboard." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          flexWrap="nowrap"
          minH="70vh"
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
              size="lg"
              textAlign={["center", "center", "left", "left"]}
            >
              Organize all your classes the way you want it. Track tasks, files, marks and tests all in one place.
            </Text>
            <Link href="#">
              <Button 
              rightIcon={<ArrowForwardIcon/>} 
              colorScheme="blue" 
              variant="solid"
              >
                Try it
              </Button>
            </Link>
          </Stack>
          <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
            <Image src="/images/placeholder.jpeg" size="100%" rounded="1rem" shadow="xl" />
          </Box>

        </Flex>
      </main>
      
    </div>
  )
}
