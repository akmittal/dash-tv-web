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
  const { isLoading, error, data } = useQuery("data", fetchData);

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
    <Flex>
      <Helmet script={[{src:"https://vjs.zencdn.net/7.11.4/video.min.js"},{src:"https://unpkg.com/@videojs/http-streaming@2.7.1/dist/videojs-http-streaming.min.js"}]}>
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
    </Flex>
  );
}
