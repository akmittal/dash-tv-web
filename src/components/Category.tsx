import { Flex, Heading } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Channel } from "./../utils";
import ChannelCard from "./ChannelCard";

interface Props {
  name: string;
  channels: Channel[];
}

export default function Category({ name, channels }: Props): ReactElement {
  return (
    <div>
      <Heading>{!name ? "Other" : name}</Heading>
      <Flex wrap="wrap">
        {channels.map((channel) => (
          <Flex flex={["50%", "33%", "25%"]} p="5">
            <Link
              to={`/watch/${encodeURIComponent(channel.url)}`}
              style={{ width: "100%" }}
            >
              <ChannelCard channel={channel}></ChannelCard>
            </Link>
          </Flex>
        ))}
      </Flex>
    </div>
  );
}
