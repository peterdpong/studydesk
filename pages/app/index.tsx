import Navbar from "../../components/app/navbar";
import Dashboard from "../../components/app/Dashboard";
import { useAuth } from "../../lib/auth";
import { protectedRoute } from "../../lib/hoc/protectedRoute";

function App() {
  return (
    <div>
      <Navbar/>
      <Dashboard/> 
    </div>
  );
}

export default protectedRoute(App);