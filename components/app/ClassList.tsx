import React from 'react';
import { 
    Box,
    Text, 
    Button,
    SimpleGrid,
    Spacer,
    Heading,
    useBreakpointValue,
    useDisclosure
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import ClassListModal from './modals/ClassListModal';
import { Class } from '../../lib/models/Class';


export default function Classes(props: { classList: Class[], uid: string}) {
  if(props.classList === undefined) return null;

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const buttonSize = useBreakpointValue({base: "sm", md: "md"});
  
    return (
      <Box>
        <Box display={{md: "flex"}} pb={5}>
          <Heading textAlign={{base: "center"}}>
            Classes
          </Heading>
          <Spacer/>
          <Box alignItems="right" mt={{md: "0", base: "3"}}>
            <Button colorScheme="green" size={buttonSize} onClick={onOpen} rightIcon={<AddIcon/>}>New class</Button>
          </Box>
        </Box> 

        <SimpleGrid minChildWidth={{base: 100, md: 200}} spacing="4" justifyItems="center">
          {props.classList.map((c: Class) => {
            return(
              <Link href={`/app/class/${c.name}`} key={c.name}>
                <Button border="none" colorScheme={'green'} w={{base: 100, md: 200}} h={{base: 100, md: 125}} borderRadius={20}>
                  <Text>
                    {c.name}
                  </Text>
                </Button>
              </Link>
            );
          })}
        </SimpleGrid>

        <ClassListModal isOpen={isOpen} onClose={onClose} uid={props.uid} classes={props.classList} />

      </Box>
    )
}
