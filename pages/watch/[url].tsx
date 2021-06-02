import { Flex, VStack } from "@chakra-ui/layout";
import React, { ReactElement, useEffect } from "react";
import videojs from "video.js";
import Helmet from "react-helmet";
import { Spinner } from "@chakra-ui/spinner";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Channel, fetchData } from "../../src/utils";
import Link from "next/link"
import {useRouter} from "next/router"

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

const getChannel = (data: Channel[], url: string) =>
  data.find((channel: Channel) => channel.url === decodeURIComponent(url));

export default function Watch({data}): ReactElement {
  const router = useRouter();
  let {url} = router.query;
  if(Array.isArray(url)){
    url = url[0];
  }
 
  useEffect(() => {
    let player: videojs.Player;
    if (data) {
      player = videojs("video");
    }
    return () => {
      player.dispose();
    };
  }, [data, url]);

 
  const channel = getChannel(data, decodeURIComponent(url));

  return (
    <Flex direction="column" gridGap="2">
      <Helmet
        script={[
          { src: "https://unpkg.com/video.js@7.11.8/dist/video.min.js" },
          {
            src: "https://unpkg.com/@videojs/http-streaming@2.7.1/dist/videojs-http-streaming.min.js",
          },
        ]}
      >
        <title>Watch {channel?.name} live Free </title>
        <meta name="description" content={`Watch ${channel?.name} live in HD quality`} />
      </Helmet>

      <video-js
        style={{ width: "100%", minHeight: "400px" }}
        id="video"
        autoPlay
        src={decodeURIComponent(url)}
        controls
        className="vjs-default-skin"
      >
        <source
          src={decodeURIComponent(url)}
          type="application/x-mpegURL"
        />
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
    </Flex>
  );
}
