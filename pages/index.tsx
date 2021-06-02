import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement, useMemo } from "react";
import { useQuery } from "react-query";
import Category from "./../src/components/Category";

import { fetchData, getCategories, getChannelByCategory } from "../src/utils";

import { Helmet } from "react-helmet";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

interface Props {
  selectedLanguages: string[];
  data: any
}

export default function Index({ selectedLanguages, data }: Props): ReactElement {


  const categories = useMemo(
    () => getCategories(data, selectedLanguages),
    [data, selectedLanguages]
  );

 

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
        <TabList overflow="scroll" style={{scrollbarWidth:"none"}}>
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
