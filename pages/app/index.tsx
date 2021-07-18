import { Button, Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Navbar from "../../components/app/navbar";
import { useAuth } from "../../lib/auth";

export default function App() {
  const {auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!loading && !auth) {
      router.push('/login');
    }
  }, [auth, loading]);

  if(loading || !auth) {
    return (
      <div>
        <Center>
          <Spinner size="4xl"/>
        </Center>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
    </div>
  );
}