import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  Heading,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Box py={'20px'} px={'15%'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading fontWeight={700} fontSize={'xl'}>
            Studydesk
          </Heading>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={2}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              {/* <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={400}
                variant={'outline'}
                href={'/signin'}
              >
                Sign In
              </Button>
              <Button
                as={'a'}
                display={'inline-flex'}
                fontSize={'sm'}
                fontWeight={600}
                // TODO(Peter): Change to use PrimaryButton Component.
                bg="brand.primary"
                _hover={{ bg: 'brand.primary_hover' }}
                _active={{ bg: 'brand.primary_hover' }}
                color="white"
                variant="solid"
                href={'/signup'}
              >
                Sign Up
              </Button> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
