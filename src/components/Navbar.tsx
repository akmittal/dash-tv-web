import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar(): ReactElement {
  return (
    <Flex>
      <Link href="/">
        <ChakraLink style={{ width: "100%" }}>
          <Flex p="2" justifyContent="center" width="full">
            <Image src="/logo.png" width="320px" height="100%" alt="Dash TV Logo" />
          </Flex>
        </ChakraLink>
      </Link>
    </Flex>
  );
}
