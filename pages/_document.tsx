import * as React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native-web";
import { flush } from "@gluestack-style/react";

function Document() {
  return (
    <Html className="gs" lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <script
        src="https://beamanalytics.b-cdn.net/beam.min.js"
        data-token={process.env.ANALYTICS_TOKEN}
        async
      ></script>
    </Html>
  );
}

Document.getInitialProps = async ({ renderPage }: any) => {
  AppRegistry.registerComponent("Main", () => Main);
  const { getStyleElement } = AppRegistry.getApplication("Main");
  const page = await renderPage();
  const styles = [getStyleElement(), ...flush()];
  return { ...page, styles: React.Children.toArray(styles) };
};

export default Document;
