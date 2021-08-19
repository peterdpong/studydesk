import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Navbar from "../../components/app/navbar";
import Dashboard from "../../components/app/Dashboard";
import { FullPageLoading } from "../../components/FullPageLoading";
import { useAuth } from "../../lib/auth";

export default function App() {
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!loading && !auth) {
      router.push('/signin');
    }
  }, [auth, loading]);

  if(loading || !auth) {
    return (
      <FullPageLoading/>
    );
  }

  return (
    <div>
      <Navbar/>
      <Dashboard auth={auth}/>
    </div>
  );
}