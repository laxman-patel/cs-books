import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { extendTheme } from "@chakra-ui/react";
import Fonts from "../components/Fonts";

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
