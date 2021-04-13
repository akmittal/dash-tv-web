import { Flex } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { Channel } from "../utils";

interface Props {
  channel: Channel;
}

export default function ChannelCard({ channel }: Props): ReactElement {
  return (
    <Flex width="100%" flexGrow={1} minHeight="200px" height="100%">
      {channel.logo ? (
        <img src={channel.logo} alt={channel.name} loading="lazy" />
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
          height="100%"
        >
          {channel.name}
        </Flex>
      )}
    </Flex>
  );
}
