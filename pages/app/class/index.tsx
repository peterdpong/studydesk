import { Box } from '@chakra-ui/react'
import React from 'react'
import ClassList from '../../../components/app/ClassList'
import Sidebar from '../../../components/app/Sidebar'
import { useAuth } from '../../../lib/auth'
import { protectedRoute } from '../../../lib/hoc/protectedRoute'

function ClassIndex() {
  const { useRequiredAuth } = useAuth()
  const auth = useRequiredAuth()
  return (
    <Sidebar>
      <Box w={{ base: '100%', md: '65%' }} p={10}>
        <ClassList classList={auth!.classes!} uid={auth!.uid!} />
      </Box>
    </Sidebar>
  )
}

export default protectedRoute(ClassIndex)
