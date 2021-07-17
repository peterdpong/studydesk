import { Button, Center, Flex, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useAuth } from "../lib/auth";
import { getUser } from "../lib/firestoredb";


export default function Login(props: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { signinWithEmailAndPassword, auth, loading } = useAuth();

  function onSubmit(event: any): void {
    setError(null);

    signinWithEmailAndPassword(email, password).then(
      (authUser: any) => {
        console.log("User logged in");
        console.log(authUser);
        navigateToApp()
      }
    ).catch(error => {
      setError(error.message);
    });

    event.preventDefault();
  }

  function navigateToApp(): void {
    router.push('/app');
  }

  // Checking for previous login session
  if(loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" m={5}>
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in loading</Heading>
          <Center>
            <Spinner size="xl" />
          </Center>
        </Flex>
      </Flex>
    );
  } else if (auth && !loading) {
    console.log(props)
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" m={5}>
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in as {props.userData}</Heading>
          <Button colorScheme="blue" onClick={navigateToApp}>Log in</Button>
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
        <Button colorScheme="blue" onClick={onSubmit}>Log In</Button>
        {error ? <Text color={'red.400'}>Error: {error}</Text> : null}
      </Flex>

    </Flex>
  )

}

export async function getServerSideProps() {
  const { auth } = useAuth();
  const user = await getUser(auth);
  console.log(user);

  return { props: {userData: user } }
}