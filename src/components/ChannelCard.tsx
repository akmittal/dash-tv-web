import { Flex } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { Channel } from "../utils";
import Image from "next/image";

interface Props {
  channel: Channel;
}


export default function ChannelCard({ channel }: Props): ReactElement {
  return (
    <Flex width="100%" flexGrow={1} flex="1 0 auto">
      {channel.logo ? (
        channel.logo.startsWith("https://i.imgur.com")||channel.logo.startsWith("https://images-na.ssl-images-amazon.com")? (
          <Image
            src={channel.logo}
            alt={channel.name}
            loading="lazy"
            width="400px"
            height="100%"
          />
        ) : (
          <img
            src={channel.logo}
            alt={channel.name}
            loading="lazy"
            width="100%"
            height="100%"
          />
        )
      ) : (
        <Flex
          p="4"
          background="blackAlpha.500"
          color="white"
          alignItems="center"
          justifyContent="center"
          fontFamily="sans-serif"
          textAlign="center"
          fontSize="4xl"
          flexGrow={1}
          width="100%"
          height="auto"
        >
          {channel.name}
        </Flex>
      )}
    </Flex>
  );
}
