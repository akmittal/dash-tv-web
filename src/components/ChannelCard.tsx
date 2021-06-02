import { Flex } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { Channel } from "../utils";



interface Props {
  channel: Channel;
}

export default function ChannelCard({ channel }: Props): ReactElement {
  return (
    <Flex width="100%" flexGrow={1}   flex="1 0 auto">
      {channel.logo ? (
        <img src={channel.logo} alt={channel.name} loading="lazy" width="100%" style={{height:"100%!important"}} />
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
