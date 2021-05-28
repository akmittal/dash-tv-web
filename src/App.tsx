import * as React from "react";
import { useQuery } from "react-query";
import {
  ChakraProvider,
  Box,
  Grid,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import theme from "./theme";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { fetchData, getLanguages } from "./utils";
import { SettingsIcon } from "@chakra-ui/icons";
import Languages from "./components/Languages";
import "./App.css";

const CategoryPage = React.lazy(() => import("./pages/Category"));

const Watch = React.lazy(() => import("./pages/Watch"));
const Home = React.lazy(() => import("./pages/Home"));

const preSelectedLanguages = localStorage.getItem("selected-languages");
if(!preSelectedLanguages){
  localStorage.setItem("selected-languages",JSON.stringify(["English"]));
}

export const App = () => {
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    preSelectedLanguages ? JSON.parse(preSelectedLanguages) : ["English"]
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

  const { isLoading, error, data } = useQuery("data", fetchData, {
    staleTime: 1000 * 60 * 60,
  });
  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;

  return (
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={<Spinner />}>
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
              <Route path="/category/:name">
                  <CategoryPage  selectedLanguages={selectedLanguages} />
                </Route>
                <Route path="/watch/:url">
                  <Watch />
                </Route>
                <Route path="/">
                  <Home selectedLanguages={selectedLanguages} />
                </Route>
              </Switch>
            </Grid>
          </Box>
        </Router>
      </React.Suspense>
    </ChakraProvider>
  );
};
