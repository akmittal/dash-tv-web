import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement, useMemo } from "react";
import { useQuery } from "react-query";
import Category from "../src/components/Category";

import { fetchData, getCategories, getChannelByCategory } from "../src/utils";

import { Helmet } from "react-helmet";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

interface Props {
  selectedLanguages: string[];
  data:any;
}

export default function Home({ selectedLanguages=["English"], data:initialData }: Props): ReactElement {
  const { isLoading, error, data } = useQuery("data", fetchData, {
    staleTime: 1000 * 60 * 60,
    initialData
  });

  const categories = useMemo(
    () => getCategories(data, selectedLanguages),
    [data, selectedLanguages]
  );

  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;

  return (
    <>
      <Helmet>
        <title>Watch TV channels live - Movies, Music, Comedy </title>
        <meta name="description" content="Watch Music, Movies, Sports, Business, News Comedy, Cooking, Kids TV channels live for free" />
        <meta
          name="keywords"
          content="TV LIVE, TV STREAM, WATCH TV, Music, Movies, Comedy, Documentry, Business, Weather, Cooking, Lifestyle, Sports, News, Start Sports, AAJ Tak, ABP NEWS, AlJajeera, BBC News, CBC NEWS, CNN, DD NEWS, DW, FOX NEWS, 9XM, VEVO,"
        />
      </Helmet>
      <Tabs width="calc(100vw - 20px)" overflow="hidden">
        <TabList overflow="scroll" style={{scrollbarWidth:"none", padding:"3px"}}>
          {categories.map((category) => (
            <Tab>{!category ? "Other" : category}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {categories.map((category) => (
            <TabPanel>
              <Category
                name={category}
                key={category}
                channels={getChannelByCategory(
                  data,
                  category,
                  selectedLanguages
                )}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}
