import { Context } from "@/context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();
  const { setInitialLoading } = useContext(Context);
  useEffect(() => {
    const authToken = localStorage.getItem("authorization");
    if (authToken) {
      // if auth token is present in local storage that means user is logged in
      if (router.pathname === "/") router.replace("/dashboard");
    } else {
      router.replace("/");
    }

    // called in timer to execute this after routing is finished
    setTimeout(() => {
      setInitialLoading(false);
    }, 100);
  }, []);
};
