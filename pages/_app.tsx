import App, { AppContext } from "next/app";
import "../src/App.css";
import { useEffect, useState, lazy, Suspense } from "react";
import Head from "next/head";
import { ColorModeSwitcher } from "./../src/ColorModeSwitcher";
import {
  ColorModeScript,
  createStandaloneToast,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  fetchAllLanguages,
  fetchData,
  fetchDataWithLanguages,
  getLanguages,
} from "./../src/utils";
import { Hydrate } from "react-query/hydration";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import theme from "./../src/theme";
import {
  ChakraProvider,
  Box,
  Grid,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Navbar from "./../src/components/Navbar";

import { SettingsIcon } from "@chakra-ui/icons";
import { FiX } from "react-icons/fi";
import dynamic from "next/dynamic";
import cookie from "next-cookies";
import jscookie from "js-cookie";

const queryClient = new QueryClient();

const toast = createStandaloneToast();

const Languages = dynamic(() => import("./../src/components/Languages"));

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function showToast(setShowLanguagesModal) {
  toast({
    title: "Languages",
    description: "",
    status: "info",
    duration: 9000,
    isClosable: true,
    render() {
      return (
        <Flex
          position="relative"
          color="black"
          p={3}
          pt="6"
          gridGap="20px"
          bg="yellow.100"
          borderRadius="xl"
          alignItems="center"
        >
          <VStack alignItems="flex-start">
            <Heading size="sm">Update Languages</Heading>
            <Text>Showing English Channels, change language?</Text>
          </VStack>

          <Button
            colorScheme="blackAlpha"
            onClick={() => {
              toast.closeAll();
              setShowLanguagesModal(true);
            }}
          >
            Yes
          </Button>
          <IconButton
            onClick={() => toast.closeAll()}
            _hover={{
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
            background="transparent"
            width="20px"
            height="20px"
            position="absolute"
            top="5px"
            right="5px"
            aria-label=""
            icon={<FiX />}
          ></IconButton>
        </Flex>
      );
    },
  });
}
export default function MyApp({ Component, pageProps, selectedLanguages:preselected, allLanguages }) {
  const [selectedLanguages, setSelectedLanguages] = useState(preselected||["English"]);
  const [showLanguagesModal, setShowLanguagesModal] = useState<boolean>(false);
  useEffect(() => {
    if (!preselected) {
      setTimeout(() => showToast(setShowLanguagesModal), 2000);
    }
  }, [preselected]);
  const toggleLanguage = (language: string) => {
    let newLanguages = [];
    if (!selectedLanguages.includes(language)) {
      newLanguages = [...selectedLanguages, language];
    } else {
      newLanguages = [...selectedLanguages.filter((lan) => language !== lan)];
    }
    jscookie.set("selectedLanguages", JSON.stringify(newLanguages), {
    
      expires: 9000,
    });
    if (typeof window !== "undefined") {
    localStorage.setItem("selected-languages", JSON.stringify(newLanguages));
    }
    setSelectedLanguages(newLanguages);
    
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
                languages={allLanguages}
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { selectedLanguages } = cookie(appContext.ctx);
  const allLanguages = await fetchAllLanguages()

  

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
 

  return { ...appProps, selectedLanguages, allLanguages };
};
