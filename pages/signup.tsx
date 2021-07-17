import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useAuth } from "../lib/auth";


export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { createUserWithEmailAndPassword } = useAuth();

  function onSubmit(event: any) {
    setError(null);

    if(passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(email, passwordOne, name).then(
        (authUser: any) => {
          console.log("User created");
          router.push('/app');
          
        }
      ).catch(error => {
        setError(error.message);
      });
    } else {
      setError("Password do not match");
    }

    event.preventDefault();
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" m={5}>
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Create your Studydesk account</Heading>
        <Input placeholder="Name" mb={3} type="text" value={name} onChange={(event) => setName(event.target.value)}/>
        <Input placeholder="Email" mb={3} type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <Input placeholder="Password" mb={3} type="password" value={passwordOne} onChange={(event) => setPasswordOne(event.target.value)}/>
        <Input placeholder="Confirm Password" mb={3} type="password" value={passwordTwo} onChange={(event) => setPasswordTwo(event.target.value)}/>
        <Button colorScheme="blue" onClick={onSubmit}>Sign up</Button>
        {error ? <Text color={'red.400'}>Error: {error}</Text> : null}
      </Flex>

    </Flex>
  )

}