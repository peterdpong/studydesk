import { Box, Button, chakra, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { PasswordField } from "../components/auth/PasswordField";
import { PasswordFieldSignup } from "../components/auth/PasswordFieldSignup";
import { Card } from "../components/Card";
import { TextWithDivider } from "../components/forms/TextWithDivider";
import { FullPageLoading } from "../components/FullPageLoading";
import { useAuth } from "../lib/auth";


export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [signUpAttempt, setSignUpAttempt] = useState<boolean>(false);
  const router = useRouter();

  const { createUserWithEmailAndPassword, signinWithGoogle, loading } = useAuth();

  function onEmailSignup(event: any) {
    setError(null);
    setSignUpAttempt(true);

    if(passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(email, passwordOne, name).then(
        (authUser: any) => {
          router.push('/app');
        }
      ).catch(error => {
        setError(error.message);
      });
    } else {
      setError("Password do not match");
      setSignUpAttempt(false);
    }

    event.preventDefault();
  }

  function onGoogleSignup(event: any): void {
    setError(null);
    setSignUpAttempt(true);

    signinWithGoogle().then(
      () => {
        router.push('/app');
      }
    ).catch(error => {
      setError(error.message);
      setSignUpAttempt(false);
    });

    event.preventDefault();
  }

  if(loading || signUpAttempt) {
    return(
      <FullPageLoading/>
    )
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Create an account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Have an account? </Text>
          <Link href="/signin" color={'blue.500'} _hover={{color: 'blue.600'}} display={{ base: 'block', sm: 'inline' }}>Sign in.</Link>
        </Text>
        <Card>
          <chakra.form
            onSubmit={onEmailSignup}
          >
            <Stack spacing="6">
            <FormControl id="name">
                <FormLabel>Full Name</FormLabel>
                <Input name="name" type="name" value={name} onChange={(event) => setName(event.target.value)} required />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </FormControl>
              <PasswordFieldSignup id={"password-1"} name={"Password"} value={passwordOne} onChange={(event) => setPasswordOne(event.target.value)}/>
              <PasswordFieldSignup id={"password-2"} name={"Confirm Password"} value={passwordTwo} onChange={(event) => setPasswordTwo(event.target.value)}/>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Sign up
              </Button>
              {error ? <Text color={'red.400'} fontWeight="semibold" fontSize="sm">Error: {error}</Text> : null}
            </Stack>
          </chakra.form>
          <TextWithDivider my="6">or continue with</TextWithDivider>
            <Stack>
              <Button onClick={onGoogleSignup} type="submit" colorScheme="blue" size="lg" fontSize="md" color="currentColor" variant="outline" leftIcon={<FaGoogle/>}>
                Sign up with Google
              </Button>
            </Stack>
        </Card>
      </Box>
    </Box>
  )

}