import type { AppProps /*, AppContext */ } from "next/app";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  ChakraProvider,
  Box,
  Grid,
  Spinner,
  Flex,
  IconButton,
  ColorModeScript,
} from "@chakra-ui/react";
import theme from "../theme";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import Navbar from "./Navbar";
import { fetchData, getLanguages } from "../utils";
import { SettingsIcon } from "@chakra-ui/icons";
import Languages from "./Languages";
import { Hydrate } from "react-query/hydration";
import { ReactElement, Suspense, useEffect, useRef, useState } from "react";
import { dehydrate } from "react-query/hydration";

interface Props {
  component: any;
  pageProps: any;
  data:any;
}


export default function Root(props: Props): ReactElement {
  let preSelectedLanguages ="";
  useEffect(() => {
   
if (typeof window !== "undefined") {
  const preSelectedLanguages = localStorage.getItem("selected-languages");
  if (!preSelectedLanguages) {
    localStorage.setItem("selected-languages", JSON.stringify(["English"]));
  }
}
   
  }, [preSelectedLanguages])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    preSelectedLanguages ? JSON.parse(preSelectedLanguages) : ["English"]
  );
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
    <Box fontSize="xl">
      <Navbar />
      <Languages
        selectedLanguages={selectedLanguages}
        toggleSelect={toggleLanguage}
        languages={getLanguages(props.data)}
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

        <props.component {...props.pageProps} selectedLanguages={selectedLanguages} data={props.data} />
      </Grid>
    </Box>
  );
}
