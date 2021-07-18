import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement, useMemo } from "react";
import { useQuery } from "react-query";
import Category from "../src/components/Category";
import cookie from "next-cookies";
import {GetServerSideProps, GetServerSidePropsResult} from "next";

import {  fetchDataWithLanguages, getCategories, getChannelByCategory } from "../src/utils";

import Head from "next/head";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";


interface Props {
  selectedLanguages: string[];
  data:any;
}

export default function Home({ selectedLanguages=["English"], data:initialData }: Props): ReactElement {
  const { isLoading, error, data } = useQuery<any, Error>(["data",selectedLanguages], () => fetchDataWithLanguages(selectedLanguages), {
    // staleTime: 1000 * 60 * 60,
    initialData
  });

  const categories = useMemo(
    () => getCategories(data),
    [data]
  );

  if (isLoading) return <Spinner />;

  if (error) return <>{error?.message}</>;

  return (
    <>
      <Head>
        <title>Watch TV channels live online - Movies, Music, Comedy, News </title>
        <meta name="description" content="Watch Music, Movies, Sports, Business, News Comedy, Cooking, Kids TV channels live for free" />
        <meta
          name="keywords"
          content="TV LIVE online, TV Online, TV STREAM, WATCH TV, Music, Movies, Comedy, Documentry, Business, Weather, Cooking, Lifestyle, Sports, News, Start Sports, AAJ Tak, ABP NEWS, AlJajeera, BBC News, CBC NEWS, CNN, DD NEWS, DW, FOX NEWS, 9XM, VEVO,"
        />
      </Head>
      <Tabs width="calc(100vw - 20px)" overflow="hidden">
        <TabList overflow="scroll" style={{scrollbarWidth:"none", padding:"3px"}}>
          {categories.map((category) => (
            <Tab key={category}>{!category ? "Other" : category}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {categories.map((category) => (
            <TabPanel key={category}>
              <Category
                name={category}
                
                channels={getChannelByCategory(
                  data,
                  category
                )}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { selectedLanguages } = cookie(ctx);
  const res: GetServerSidePropsResult<any>  = { props : {}}

   const json = await fetchDataWithLanguages(selectedLanguages);

   res.props.data = json;
  
    return res;
  };