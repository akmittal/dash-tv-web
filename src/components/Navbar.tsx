import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Link from "next/link";

export default function Navbar(): ReactElement {
  return (
    <Flex>
      <Link href="/">
        <ChakraLink style={{ width: "100%" }}>
          <Flex p="2" justifyContent="center" width="full">
            <img src="/logo.png" width="35%" height="auto" alt="Dash TV Logo" />
          </Flex>
        </ChakraLink>
      </Link>
    </Flex>
  );
}
