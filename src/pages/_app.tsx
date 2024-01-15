import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import SplashWrapper from "@/components/utils/SplashWrapper";
import ContextProvider from "@/context/ContextProvider";
import UIProvider from "@/context/UIProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Booker</title>
      </Head>
      <UIProvider>
        <ContextProvider>
          <SplashWrapper>
            <Component {...pageProps} />
          </SplashWrapper>
        </ContextProvider>
      </UIProvider>
    </>
  );
}
