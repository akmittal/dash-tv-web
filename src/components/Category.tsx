import { Flex } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { Channel } from "./../utils";
import ChannelCard from "./ChannelCard";
import Link from "next/link"

interface Props {
  name: string;
  channels: Channel[];
}

export default function Category({ name, channels }: Props): ReactElement {
  return (
    <>
      <Flex wrap="wrap">
        {channels.map((channel) => (
          <Flex flex={["50%", "33%", "25%"]} p="5" key={channel.url}>
            <Link
              href={`/watch/${encodeURIComponent(channel.url)}`}
            
            ><a>
              <ChannelCard channel={channel}></ChannelCard></a>
            </Link>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
