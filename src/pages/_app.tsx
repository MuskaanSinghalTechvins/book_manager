import SplashWrapper from "@/components/utils/SplashWrapper";
import ContextProvider from "@/context/ContextProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <SplashWrapper>
        <Component {...pageProps} />
      </SplashWrapper>
    </ContextProvider>
  );
}
