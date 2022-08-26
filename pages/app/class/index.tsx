import React from 'react'
import { protectedRoute } from '../../../lib/hoc/protectedRoute'

function index() {
  return <div>Main Class Page</div>
}

export default protectedRoute(index)
