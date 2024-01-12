import { Context } from "@/context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();
  const { setInitialLoading } = useContext(Context);

  useEffect(() => {
    const authToken = localStorage.getItem("authorization");
    setInitialLoading(false);
    if (authToken) {
      // if auth token is present in local storage that means user is logged in
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, []);
};
