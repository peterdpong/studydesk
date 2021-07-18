import { Button, Center, Flex, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useAuth } from "../lib/auth";


export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loginAttempt, setLoginAttempt] = useState<boolean>(false);
  const router = useRouter();

  const { signinWithEmailAndPassword, signOut , auth, userData, loading } = useAuth();

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

  console.log(loading)
  console.log(loginAttempt)

  // Checking for previous login session
  if(loading || loginAttempt) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" m={5}>
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Center>
            <Spinner size="xl" />
          </Center>
        </Flex>
      </Flex>
    );
  } else if (auth && !loginAttempt) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" m={5}>
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in as {userData.name}</Heading>
          <Button colorScheme="blue" mb={2} onClick={navigateToApp}>Log in</Button>
          <Button colorScheme="blue" mb={2} onClick={signOut}>Log in to a different account</Button>
          <Button colorScheme="blue" mb={2} onClick={navigateToSignup}>Sign up</Button>
        </Flex>
      </Flex>
    )

  }

  // Login Form
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" m={5}>
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Login to Studydesk</Heading>
        <Input placeholder="Email" mb={3} type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <Input placeholder="Password" mb={3} type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <Button colorScheme="blue" mb={2} onClick={onSubmit}>Log In</Button>
        <Button colorScheme="blue" mb={2} onClick={navigateToSignup}>Sign up</Button>
        {error ? <Text color={'red.400'}>Error: {error}</Text> : null}
      </Flex>

    </Flex>
  )

}