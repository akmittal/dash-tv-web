import App from "next/app";
import "../src/App.css";
import { useState } from "react";
import Head from "next/head";
import { ColorModeSwitcher } from "./../src/ColorModeSwitcher";
import { ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchData, getLanguages } from "./../src/utils";
import { Hydrate } from "react-query/hydration";
import Router from "next/router"; 
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import theme from "./../src/theme";
import {
  ChakraProvider,
  Box,
  Grid,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Navbar from "./../src/components/Navbar";
import Languages from "./../src/components/Languages";
import { SettingsIcon } from "@chakra-ui/icons";
import useLanguages from "../hooks/useLanguages";

const queryClient = new QueryClient();
let preSelectedLanguages: string = "";
if (typeof window !== "undefined") {
  preSelectedLanguages = localStorage.getItem("selected-languages") || "";
  if (!preSelectedLanguages) {
    localStorage.setItem("selected-languages", JSON.stringify(["English"]));
  }
}

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps, data }) {
  const [selectedLanguages, setSelectedLanguages] = useLanguages();
  const [showLanguagesModal, setShowLanguagesModal] = useState<boolean>(
    !preSelectedLanguages
  );
  const toggleLanguage = (language: string) => {
    let newLanguages = [];
    if (!selectedLanguages.includes(language)) {
      newLanguages = [...selectedLanguages, language];
    } else {
      newLanguages = [...selectedLanguages.filter((lan) => language !== lan)];
    }
    setSelectedLanguages(newLanguages);
    localStorage.setItem("selected-languages", JSON.stringify(newLanguages));
  };
  return (
    <>
      <Head>
        <title>DASH TV - Watch Live TV channels Free</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
          
            <Box fontSize="xl">
              <Navbar />
              <Languages
                selectedLanguages={selectedLanguages}
                toggleSelect={toggleLanguage}
                languages={getLanguages(data)}
                isOpen={showLanguagesModal}
                onClose={() => setShowLanguagesModal(false)}
              />
              <Grid p={3}>
                <Flex justifyContent="flex-end">
                  <IconButton
                    size="md"
                    aria-label="settings"
                    variant="ghost"
                    color="current"
                    marginLeft="2"
                    icon={<SettingsIcon />}
                    onClick={() => setShowLanguagesModal(true)}
                  ></IconButton>
                  <ColorModeSwitcher />
                </Flex>

                <Component
                  {...pageProps}
                  data={data}
                  selectedLanguages={selectedLanguages}
                />
              </Grid>
            </Box>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const data = (await fetchData()).slice(0, 5000); // TODO: temporary limit to 5000 becais

  return { ...appProps, data };
};
