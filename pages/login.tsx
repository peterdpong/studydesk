import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../lib/auth";


export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { signinWithEmailAndPassword, auth, loading } = useAuth();

  // UseEffect hook to check if already logged in.
  useEffect(() => {
    if(auth || loading) {
      router.push('/app');
    }
  }, [auth, loading]);

  function onSubmit(event: any) {
    setError(null);

    signinWithEmailAndPassword(email, password).then(
      (authUser: any) => {
        console.log("User logged in");
        router.push('/app');
      }
    ).catch(error => {
      setError(error.message);
    });

    event.preventDefault();
  }

  // Checking for previous login session
  if(loading || auth) {
    return (<div>Checking for login session.</div>)
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" m={5}>
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Login to Studydesk</Heading>
        <Input placeholder="Email" mb={3} type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <Input placeholder="Password" mb={3} type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <Button colorScheme="blue" onClick={onSubmit}>Sign In</Button>
        {error ? <Text color={'red.400'}>Error: {error}</Text> : null}
      </Flex>

    </Flex>
  )

}