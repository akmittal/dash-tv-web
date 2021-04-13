import * as React from "react";
import { useQuery } from "react-query";
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { fetchData, getLanguages } from "./utils";
import { SettingsIcon } from "@chakra-ui/icons";
import Languages from "./components/Languages";
import Watch from "./pages/Watch";
import Home from "./pages/Home";

const preSelectedLanguages = localStorage.getItem("selected-languages");

export const App = () => {
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    preSelectedLanguages ? JSON.parse(preSelectedLanguages) : []
  );
  const [showLanguagesModal, setShowLanguagesModal] = React.useState<boolean>(
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

  const { isLoading, error, data } = useQuery("data", fetchData);
  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;

  return (
    <ChakraProvider theme={theme}>
       <Router>
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

         
           
            <Switch>
             
              <Route path="/watch/:url">
                <Watch />
              </Route>
              <Route path="/">
                <Home selectedLanguages={selectedLanguages} />
              </Route>
            </Switch>
        
        </Grid>
      </Box></Router>
    </ChakraProvider>
  );
};
