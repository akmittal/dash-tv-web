import type { AppProps /*, AppContext */ } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import App from 'next/app'
import {
  ChakraProvider,
  ColorModeScript,
} from "@chakra-ui/react";
import theme from "../src/theme";

import "../src/App.css";
import { dehydrate, Hydrate } from "react-query/hydration";
import {  useRef, } from 'react';
import Head from "next/head";


import Root from "./../src/components/Root"
import { fetchData } from '../src/utils';
import { GetServerSideProps, GetStaticProps } from 'next';

interface DataProps{
  data:any
}

function MyApp(props:AppProps & DataProps) {
 
// console.log(props)
  return (
    <>
        <Head>
        <title>DASH TV - Watch Live TV channels Free</title>
    <link
      href="https://unpkg.com/video.js@7.11.8/dist/video-js.min.css"
      rel="stylesheet"
    />
        </Head>
     
        <ColorModeScript />
        <ChakraProvider theme={theme}>
            <Root component={props.Component} pageProps={props.pageProps}  data={props.data} /> 
                
       
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
  const data = await fetchData();
  // console.log({data})
 
   

  return { ...appProps, data }
}




export default MyApp;
