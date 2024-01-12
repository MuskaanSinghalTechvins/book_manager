import SplashWrapper from "@/components/utils/SplashWrapper";
import ContextProvider from "@/context/ContextProvider";
import UIProvider from "@/context/UIProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ContextProvider>
        <SplashWrapper>
          <Component {...pageProps} />
        </SplashWrapper>
      </ContextProvider>
    </UIProvider>
  );
}
