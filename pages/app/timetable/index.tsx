import React from 'react'
import Sidebar from '../../../components/app/Sidebar'
import { protectedRoute } from '../../../lib/hoc/protectedRoute'

function Timetable() {
  return (
    <div>
      <Sidebar>Timetable Index</Sidebar>
    </div>
  )
}

export default protectedRoute(Timetable)
