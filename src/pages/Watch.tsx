import { Flex } from "@chakra-ui/layout";
import React, { ReactElement, useEffect} from "react";
import { useParams } from "react-router";
import videojs from "video.js";
import Helmet from "react-helmet";
import { Spinner } from "@chakra-ui/spinner";
import { useQuery } from "react-query";
import { Channel, fetchData } from "../utils";


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

export default function Watch(): ReactElement {
  const params = useParams<ParamTypes>();
  const { isLoading, error, data } = useQuery("data", fetchData, {
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
      let player:videojs.Player;
    if (data) {

       player = videojs("video");
    }
    return () => {
        player.dispose();
    }
  }, [data, params.url]);

  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;

  return (
    <Flex direction="column" gridGap="2">
      <Helmet script={[{src:"https://unpkg.com/video.js@7.11.8/dist/video.min.js"},{src:"https://unpkg.com/@videojs/http-streaming@2.7.1/dist/videojs-http-streaming.min.js"}]}>
        <title>
          Watch {getChannel(data, decodeURIComponent(params.url))?.name} live
          Free{" "}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <video-js
        style={{ width: "100%", minHeight:"400px" }}
        id="video"
        autoPlay
        src={decodeURIComponent(params.url)}
        controls
        className="vjs-default-skin"
      >
        <source
          src={decodeURIComponent(params.url)}
          type="application/x-mpegURL"
        />
      </video-js>
      <Flex gridGap="2">
        <img src={getChannel(data, decodeURIComponent(params.url))?.logo} width="50" />
      <h5>Watch {getChannel(data, decodeURIComponent(params.url))?.name} live
          Free</h5></Flex>
    </Flex>
  );
}
