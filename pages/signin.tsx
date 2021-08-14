import { Box, Button, Center, chakra, Flex, FormControl, FormLabel, Heading, Input, Link, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiLogin, HiMail } from "react-icons/hi";
import { PasswordField } from "../components/auth/PasswordField";
import { Card } from "../components/Card";
import { TextWithDivider } from "../components/forms/TextWithDivider";
import { FullPageLoading } from "../components/FullPageLoading";
import { useAuth } from "../lib/auth";


export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loginAttempt, setLoginAttempt] = useState<boolean>(false);
  const router = useRouter();

  const { signinWithEmailAndPassword, signOut , auth, loading } = useAuth();

  function onSubmit(event: any): void {
    setError(null);
    setLoginAttempt(true);

    signinWithEmailAndPassword(email, password).then(
      () => {
        navigateToApp()
      }
    ).catch(error => {
      setError(error.message);
      setLoginAttempt(false);
    });

    event.preventDefault();
  }

  function navigateToApp(): void {
    router.push('/app');
  }

  function navigateToSignup(): void {
    router.push('/signup');
  }

  // Checking for previous login session
  if(loading || loginAttempt) {
    return (
      <FullPageLoading/>
    );
  } else if (auth && !loginAttempt) {
    return (
      <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Heading mb={"4"} textAlign="center" size="xl" fontWeight="extrabold">
          Log in as {auth.firstName}
        </Heading>
        <Card>
          <Stack spacing="2">
            <Button onClick={navigateToApp} colorScheme="blue" size="lg" fontSize="md">
              Log in
            </Button>
            <Button onClick={signOut} colorScheme="blue" variant="outline" size="lg" fontSize="md">
              Log in to another account
            </Button>
          </Stack>
          <TextWithDivider my="6">or sign up</TextWithDivider>
            <Stack>
            <Button onClick={navigateToSignup} size="lg" fontSize="md" color="currentColor" variant="outline" leftIcon={<HiMail/>}>
                Sign up with Email
              </Button>
              <Button size="lg" fontSize="md" color="currentColor" variant="outline" leftIcon={<FaGoogle/>}>
                Sign up with Google
              </Button>
            </Stack>
        </Card>
      </Box>
    </Box>
    )

  }

  // Login Form
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to Studydesk
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don't have an account? </Text>
          <Link href="/signup" color={'blue.500'} _hover={{color: 'blue.600'}} display={{ base: 'block', sm: 'inline' }}>Sign up.</Link>
        </Text>
        <Card>
          <chakra.form
            onSubmit={onSubmit}
          >
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </FormControl>
              <PasswordField value={password} onChange={(event) => setPassword(event.target.value)}/>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Sign in
              </Button>
              {error ? <Text color={'red.400'} fontWeight="semibold" fontSize="sm">Error: {error}</Text> : null}
            </Stack>
          </chakra.form>
          <TextWithDivider my="6">or continue with</TextWithDivider>
            <Stack>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md" color="currentColor" variant="outline" leftIcon={<FaGoogle/>}>
                Sign in with Google
              </Button>
            </Stack>
        </Card>
      </Box>
    </Box>
  )

}