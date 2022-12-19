import Navbar from "../../components/app/Navbar";
import Dashboard from "../../components/app/Dashboard";
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