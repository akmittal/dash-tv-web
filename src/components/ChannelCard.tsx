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
      
          <Image
            src={`/api/imageproxy?url=${encodeURIComponent(channel.logo)}`}
            alt={channel.name}
            loading="lazy"
            objectFit="contain"
            width="400px"
            height="400px"
          />
        
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
