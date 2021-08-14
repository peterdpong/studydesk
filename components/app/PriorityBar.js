import React from 'react';
import {
    Box,
    Flex, 
    Text
} from "@chakra-ui/react";

export default function PriorityBar() {
  return (
    <Box mt={3} mb={7}>
      <Text fontSize={18} textAlign="center" mb={1}>Priority Indicator: </Text>

      <Flex justifyContent="center">
        <Box bg="red.400" borderLeftRadius={10}>
          <Text pl={2} pr={2}>Very High</Text>
        </Box>
        <Box bg="orange.300">
          <Text pl={2} pr={2}>High</Text>
        </Box>
        <Box bg="yellow.300">
          <Text pl={2} pr={2}>Medium</Text>
        </Box>
        <Box bg="green.300">
          <Text pl={2} pr={2}>Low</Text>
        </Box>
        <Box bg="blue.300" borderRightRadius={10}>
          <Text pl={2} pr={2}>Very Low</Text>
        </Box>
      </Flex>
  </Box>
  )
}
