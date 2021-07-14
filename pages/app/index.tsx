import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useAuth } from "../../lib/auth";

export default function App() {
  const {auth, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!loading && !auth) {
      router.push('/');
    }
  }, [auth, loading]);

  if(loading || !auth) {
    return (<div>Loading</div>);
  }


  return (<div>App</div>);
}