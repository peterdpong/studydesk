import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react'
import PrimaryButton from '../shared/PrimaryButton'

export default function Hero() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 4, md: 5 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: '4xl', sm: '5xl', md: '7xl' }}
          lineHeight={'110%'}
        >
          The home for your studying.
        </Heading>
        <Heading
          fontWeight={500}
          fontSize={{ base: 'xl', sm: 'lg', md: '2xl' }}
          color={'gray.600'}
          maxW={'3xl'}
        >
          Keep up with your classes, assignments, and deadlines all in one
          place. Studydesk makes it easy to stay organized and study
          efficiently.
        </Heading>

        {/* <Button
                rounded={'full'}
                px={6}
                colorScheme={'blue'}
                bg={'blue.500'}
                _hover={{ bg: 'blue.600' }}>
                Sign up for free.
            </Button> */}

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

        <Flex w={'full'}>
          {/* <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            /> */}
        </Flex>
      </Stack>
    </Container>
  )
}
