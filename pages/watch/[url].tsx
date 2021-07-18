import { Divider, Flex, Heading, VStack } from "@chakra-ui/layout";
import React, { createRef, ReactElement, useEffect } from "react";
import videojs from "video.js";
import Head from "next/head";
import { Spinner } from "@chakra-ui/spinner";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useQuery } from "react-query";
import {  fetchDataWithLanguages, fetchDataWithName, getChannelByCategory, Language } from "../../src/utils";
import Link from "next/link";
import Category from "./../../src/components/Category";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import cookie from "next-cookies";
import type {Channel} from "./../../src/utils/index"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "video-js": React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLElement>,
        HTMLElement
      >; // Normal web component
    }
  }
}

interface ParamTypes {
  url: string;
}

interface Props {
  selectedLanguages: string[];
  data: {channel: Channel, related: Channel[]};
  
}


export default function Watch({
  data
}: Props): ReactElement {
  const router = useRouter();
  const url = Array.isArray(router.query.url)
    ? router.query.url[0]
    : router.query.url;
  const { isLoading, error, data:{channel, related} } = useQuery<any, any>(["data",url], () => fetchDataWithName(url), {
    initialData: data,
    staleTime: 1000 * 60 * 60,
  });
  const videoRef = createRef<HTMLElement>();
  useEffect(() => {
    const player = videojs.getPlayer("video");
    if (player) {
      player.dispose();
    }
  }, []);

  useEffect(() => {
   
    let player: videojs.Player;
    if (data && videoRef.current) {
      player = videojs("video", {}, () => {
        player.src({ src: channel?.url || "", type: "application/x-mpegURL" });
      });
    }
    return () => {
      // player.reset()
    };
  }, [data, url, videoRef]);

  if (isLoading) return <Spinner />;

  if (error) return <>{ error?.message}</>;
  if(!channel){
    return <>Invalid Channel</>
  }

  return (
    <Flex direction="column" gridGap="2">
      <Head>
        <title>{channel?.name} watch live Free - Dash TV</title>
        <meta
          name="description"
          content={`Watch ${channel?.name} TV Channels live in HD quality`}
        />
      </Head>

      <video-js
        ref={videoRef}
        style={{ width: "100%", minHeight: "400px" }}
        id="video"
        autoPlay
        src={decodeURIComponent(channel.url)}
        controls
        className="vjs-default-skin"
      >
        <source src={decodeURIComponent(channel?.url)} type="application/x-mpegURL" />
      </video-js>
      <Flex gridGap="2">
        <img src={channel?.logo} alt={channel?.name} width="50" />
        <h5>Watch {channel?.name} live Free</h5>
      </Flex>
      <VStack alignItems="flex-start">
        {channel?.category && (
          <Flex gridGap="1">
            <strong>Category: </strong>
            <p>
              <Link passHref={true}
                href={`/category/${
                  channel ? encodeURIComponent(channel.category) : ""
                }`}
              >
                <ChakraLink color="blue.400">{channel?.category}</ChakraLink>
              </Link>
            </p>
          </Flex>
        )}
        <Flex gridGap="1">
          <strong>Languages: </strong>
          <p>
            {channel?.languages?.reduce(
              (acc:string, language:Language) => acc + language?.name + ", ",
              ""
            )}
          </p>
        </Flex>
        <Flex gridGap="1">
          <strong>Countries: </strong>
          <p>
            {channel?.countries?.reduce(
              (acc:string, country:any) => acc + country?.name + ", ",
              ""
            )}
          </p>
        </Flex>
      </VStack>
      <VStack mt="50">
        <Heading alignSelf="flex-start">Related Channels</Heading>
        <Divider />
        <Category
          name={channel?.category || ""}
          key={channel?.category}
          channels={related}
        />
      </VStack>
    </Flex>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
const res: GetServerSidePropsResult<any>  = { props : {}}
const name = Array.isArray(ctx.query.url)?ctx.query.url[0]:ctx.query.url
 const data = await fetchDataWithName(name);


 res.props.data = data;


  return res;
};