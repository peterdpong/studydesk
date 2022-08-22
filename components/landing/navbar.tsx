import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Heading,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons'

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
              <Button
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
                colorScheme={'blue'}
                href={'/signup'}
              >
                Sign Up
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
