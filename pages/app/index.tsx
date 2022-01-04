import Navbar from "../../components/app/navbar";
import Dashboard from "../../components/app/Dashboard";
import { useAuth } from "../../lib/auth";
import { protectedRoute } from "../../lib/hoc/protectedRoute";

function App() {
  const { useRequiredAuth } = useAuth();
  const auth = useRequiredAuth();

  // Note remove passing of auth to Dashboard component
  return (
    <div>
      <Navbar/>
      <Dashboard auth={auth}/> 
    </div>
  );
}

export default protectedRoute(App);