import { Divider, Flex, Heading, VStack } from "@chakra-ui/layout";
import React, { createRef, ReactElement, useEffect } from "react";

import videojs from "video.js";
import Helmet from "react-helmet";
import { Spinner } from "@chakra-ui/spinner";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useQuery } from "react-query";

import Link from "next/link";
import { useRouter } from "next/router";

import { Channel, fetchData, getChannelByCategory } from "../utils";

import Category from "./../components/Category"


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

interface Props{
  selectedLanguages: string[];
}
const getChannel = (data: Channel[], url: string) =>
  data.find((channel: Channel) => channel.url === decodeURIComponent(url));

export default function Watch({selectedLanguages}:Props): ReactElement {
  const router = useRouter();
  let { url } = router.query;
  if (Array.isArray(url)) {
    url = url[0];
  }
  const { isLoading, error, data } = useQuery("data", fetchData, {
    staleTime: 1000 * 60 * 60,
  });
  const videoRef = createRef<HTMLElement>();
  useEffect(() => {
    const player = videojs.getPlayer("video")
    if(player){
      player.dispose();
    }
  },[])

  useEffect(() => {
    if (Array.isArray(url)) {
      url = url[0];
    }
    const channel = getChannel(data, decodeURIComponent(url));
    let player: videojs.Player;
    if (data && videoRef.current) {
      player = videojs("video", {}, () => {
        player.src({src: channel?.url||"", type:"application/x-mpegURL"});
      });
    }
    return () => {
      // player.reset()
     
    };
  }, [data, url, videoRef]);

  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;
  const channel = getChannel(data, decodeURIComponent(url));
  console.log({selectedLanguages})


  return (
    <Flex direction="column" gridGap="2">
      <Helmet
        
      >
        <title>Watch {channel?.name} live Free </title>
        <meta
          name="description"
          content={`Watch ${channel?.name} live in HD quality`}
        />
      </Helmet>
      
      <video-js ref={videoRef}
        style={{ width: "100%", minHeight: "400px" }}
        id="video"
        autoPlay
        src={decodeURIComponent(url)}
        controls
        className="vjs-default-skin"
      >
        <source src={decodeURIComponent(url)} type="application/x-mpegURL" />
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
              <ChakraLink
                color="blue.400"
                href={`/category/${
                  channel ? encodeURIComponent(channel.category) : ""
                }`}
                as={Link}
              >
                {channel?.category}
              </ChakraLink>
            </p>
          </Flex>
        )}
        <Flex gridGap="1">
          <strong>Languages: </strong>
          <p>
            {channel?.languages.reduce(
              (acc, language) => acc + language?.name + ", ",
              ""
            )}
          </p>
        </Flex>
        <Flex gridGap="1">
          <strong>Countries: </strong>
          <p>
            {channel?.countries.reduce(
              (acc, country) => acc + country?.name + ", ",
              ""
            )}
          </p>
        </Flex>
      </VStack>
      <VStack mt="50">
        <Heading alignSelf="flex-start">Related Channels</Heading>
        <Divider />
        <Category
        name={channel?.category||""}
        key={channel?.category}
        channels={getChannelByCategory(data, channel?.category||"",selectedLanguages ).slice(0,8)}
      />
       
      </VStack>
    </Flex>
  );
}
