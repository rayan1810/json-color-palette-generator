import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { NativeBaseProvider } from "native-base";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NativeBaseProvider>
      <Component {...pageProps} />
    </NativeBaseProvider>
  );
}

export default MyApp;