import Dashboard from '../../components/app/Dashboard'
import { protectedRoute } from '../../lib/hoc/protectedRoute'
import Sidebar from '../../components/app/Sidebar'

function App() {
  return (
    <div>
      <Sidebar>
        <Dashboard />
      </Sidebar>
    </div>
  )
}

export default protectedRoute(App)
